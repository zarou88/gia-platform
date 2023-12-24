const tableTabs = document.getElementsByClassName("table-tabs");
for (let j = 0; j < tableTabs.length; j++) {
    const tableContainer = tableTabs[j].getElementsByClassName("table-container");
    let allRows = [];
    for (let i = 0; i < tableContainer.length; i++) {
        const tableRows = tableContainer[i].getElementsByClassName("table-rows");
        allRows.push(Array.from(tableRows))
    }
    const actions = index => {
        const tableBody = tableContainer[index].getElementsByClassName("table-body")[0];
        const searchTable = tableTabs[j].getElementsByClassName("search-table")[0];
        const tableRowsNumber = tableTabs[j].getElementsByClassName("table-rows-number");
        const tablePages = tableTabs[j].getElementsByClassName("table-pages")[0];
        const tableStatus = tableTabs[j].getElementsByClassName("table-status")[0];
        const tablePaganiteNext = tableTabs[j].getElementsByClassName("table-paganite-next")[0];
        const tablePaganitePrev = tableTabs[j].getElementsByClassName("table-paganite-prev")[0];
        const emptyMessage = tableContainer[index].getElementsByClassName("empty-message")[0];
        const rows = allRows[index];
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

        searchFilter(searchTable.value)

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
    }
    actions(0)
    const tabs = Array.from(tableTabs[j].getElementsByTagName("a")).filter(el => el.attributes["data-toggle"] && el.attributes["data-toggle"].value == "tab");
    let active;
    for (let i = 0; i < tabs.length; i++) tabs[i].addEventListener("click", () => {
        if (active !== i) {
            active = i
            actions(active)
        }
    })
}
