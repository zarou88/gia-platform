const tableBody = document.getElementById("table-body");
const tableRows = document.getElementsByClassName("table-rows");
const searchTable = document.getElementById("search-table");
const tableRowsNumber = document.getElementsByClassName("table-rows-number");
const tablePages = document.getElementById("table-pages");
const tableStatus = document.getElementById("table-status");
const tablePaganiteNext = document.getElementById("table-paganite-next");
const tablePaganitePrev = document.getElementById("table-paganite-prev");
const emptyMessage = document.getElementById("empty-message");

const rows = Array.from(tableRows);
let rowsNumber = tableRowsNumber[0].value == "all" ? rows.length : Number(tableRowsNumber[0].value)
let activePage = 1;

const checkBtns = (pages) => {
    if (activePage == 1) {
        tablePaganitePrev.disabled = true;
    } else {
        tablePaganitePrev.disabled = false;
    }
    if (activePage == pages) {
        tablePaganiteNext.disabled = true;
    } else {
        tablePaganiteNext.disabled = false;
    }
}

const updateTable = (newRows) => {
    while (tableBody.children[0]) {
        tableBody.children[0].remove()
    }
    if (newRows.length) {
        emptyMessage.classList.add("d-none")
    } else {
        emptyMessage.classList.remove("d-none")
    }
    let start = (activePage - 1) * rowsNumber;
    let end = activePage * rowsNumber;
    Array.from(newRows).forEach((row, index) => {
        if (index >= start && index < end) {
            tableBody.appendChild(row);
        }
    })
    let pages = Math.ceil(newRows.length / rowsNumber);
    checkBtns(pages)
    tablePages.innerHTML = `${activePage}/${pages == 0 ? 1 : pages}`
    tableStatus.innerHTML = `${start + 1}-${end > newRows.length ? newRows.length : end} of ${newRows.length}`
}

updateTable(rows)

const searchFilter = e => {
    updateTable(rows.filter(tr => {
        let flag = 0
        Array.from(tr.children).forEach(cell => {
            if (cell.textContent.replace(/[\r\n]/gm, '').replace(/[\t]/gm, ' ').trim().split(" ").filter(str => str !== "").join(" ").search(e) !== -1) {
                flag = 1
            }
        })
        return flag
    }))
}

searchTable.addEventListener("input", e => searchFilter(e.target.value))

Array.from(tableRowsNumber).forEach(trn => {
    trn.addEventListener("change", e => {
        for (let i = 0; i < tableRowsNumber.length; i++) tableRowsNumber[i].value = e.target.value
        rowsNumber = e.target.value == "all" ? rows.length : Number(e.target.value);
        activePage = 1;
        searchFilter(searchTable.value)
    })
})

tablePaganiteNext.addEventListener("click", () => {
    activePage++;
    searchFilter(searchTable.value);

})

tablePaganitePrev.addEventListener("click", () => {
    activePage--;
    searchFilter(searchTable.value);
})