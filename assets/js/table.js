// Filter And Searsh Top
const tableBody = document.getElementById("table-body");
const tableRows = document.getElementsByClassName("table-rows");
const searchTable = document.getElementById("search-table");
const tableRowsNumber = document.getElementsByClassName("table-rows-number");
const tablePages = document.getElementById("table-pages");
const tableStatus = document.getElementById("table-status");
const tablePaganiteNext = document.getElementById("table-paganite-next");
const tablePaganitePrev = document.getElementById("table-paganite-prev");
const emptyMessage = document.getElementById("empty-message");
const colFilter = document.getElementsByClassName("col-filter");
const colFilterMenu = colFilter[0].getElementsByClassName("dropdown-menu")[0];
const checkFilter = colFilterMenu.getElementsByTagName("input");
const tableHead = document.getElementsByClassName("tableHead")[0];

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
const createElementFromHTML = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
const dropdownItemSchema = (label, value) => `
<div class="dropdown-item"><label class="ckbox"><input type="checkbox" ${value && "checked"}><span>${label}</span></label></div>
`
let cols = [];
Array.from(tableHead.children).some((ch, i) => {
    if (i !== 0 && i !== 1) {
        if (ch.classList.contains("col-filter")) return;
        let values = []
        rows.forEach(row => {
            values.push(row.children[i].textContent.replace(/[\r\n]/gm, '').replace(/[\t]/gm, ' ').trim().split(" ").filter(str => str !== "").join(" "))
        })
        const newObj = {
            index: i,
            label: ch.textContent.replace(/[\r\n]/gm, '').replace(/[\t]/gm, ' ').trim().split(" ").filter(str => str !== "").join(" "),
            values,
            show: i <= 8
        }
        cols.push(newObj)
        colFilterMenu.appendChild(createElementFromHTML(dropdownItemSchema(newObj.label, newObj.show)))
    }
})

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
        Array.from(row.children).forEach(ch => ch.classList.remove("d-none"))
        cols.filter(c => c.show == false).forEach(c => {
            row.children[c.index].classList.add("d-none")
        });
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

const checkHead = () => {
    Array.from(tableHead.children).forEach((ch, i) => {
        ch.classList.remove("d-none");
    })
    cols.filter(c => c.show == false).forEach(c => {
        tableHead.children[c.index].classList.add("d-none")
    });
}

checkHead()

Array.from(checkFilter).forEach((chk, i) => {
    chk.addEventListener("change", e => {
        cols[i].show = e.target.checked;
        checkHead()
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



// input all chick
$(document).ready(function () {
    // عند النقر على الصندوق الرئيسي
    $('.checkParent').on('change', function () {
        // استخدم $(this).is(':checked') للتحقق مما إذا كان صندوق الاختيار الرئيسي محددًا أم لا
        var isChecked = $(this).is(':checked');

        // قم بتحديد صناديق الأطفال في نفس الجدول
        $('.checkChild').prop('checked', isChecked);

        // إظهار أو إخفاء زر الحذف
        if (isChecked) {
            $('.btnSelectDelete').show();
        } else {
            $('.btnSelectDelete').hide();
        }
    });

    // عند النقر على صناديق الأطفال
    $('.checkChild').on('change', function () {
        // استخدم $('.checkChild:checked').length > 0 للتحقق مما إذا كان هناك أي صندوق فرعي محدد
        var anyChildChecked = $('.checkChild:checked').length > 0;

        // إظهار أو إخفاء زر الحذف
        if (anyChildChecked) {
            $('.btnSelectDelete').show();
        } else {
            $('.btnSelectDelete').hide();
        }

        // تحقق من حالة الصندوقات الفرعية لتحديد حالة الصندوق الرئيسي
        var allChildrenChecked = $('.checkChild').length === $('.checkChild:checked').length;
        $('.checkParent').prop('checked', allChildrenChecked);
    });
});


// btnPrint
$(document).ready(function () {
    // عند النقر على زر الطباعة
    $('.btn-print').on('click', function () {
        // قم بفتح نافذة جديدة لعرض الجدول
        var printWindow = window.open('', '_blank');

        // إضافة الجدول إلى نافذة الطباعة
        printWindow.document.write('<html><head><title>Print</title></head><body style="direction: rtl;">');
        printWindow.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #dddddd; text-align: right; padding: 8px; }</style>');
        printWindow.document.write('<table>');

        // إضافة العنوان (الصف الأول) إلى نافذة الطباعة
        $('.table-responsive table thead tr').each(function () {
            printWindow.document.write('<tr>');
            $(this).find('th').not(':first-child, :last-child').each(function () {
                printWindow.document.write('<th>' + $(this).text() + '</th>');
            });
            printWindow.document.write('</tr>');
        });

        // إضافة البيانات (الصفوف باستثناء العنوان) إلى نافذة الطباعة
        $('.table-responsive table tbody tr').each(function () {
            printWindow.document.write('<tr>');
            $(this).find('td').not(':first-child, :last-child').each(function () {
                printWindow.document.write('<td>' + $(this).text() + '</td>');
            });
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table></body></html>');

        // أغلق نافذة الطباعة بعد الانتهاء من الطباعة
        printWindow.document.close();
        printWindow.print();
    });
});


// print exel
// تضمين مكتبة xlsx

$(document).ready(function () {
    // عند النقر على زر التصدير
    $('.btn-export').on('click', function () {
        // قم بتحويل بيانات الجدول إلى مصفوفة
        var tableData = [];

        // إضافة العناوين (Header) إلى المصفوفة
        var headers = [];
        $('.table-responsive table thead tr th').not(':first-child, :last-child').each(function () {
            headers.push($(this).text());
        });
        tableData.push(headers);

        // إضافة بيانات الجدول إلى المصفوفة
        $('.table-responsive table tbody tr').each(function () {
            var rowData = [];
            $(this).find('td').not(':first-child, :last-child').each(function () {
                rowData.push($(this).text());
            });
            tableData.push(rowData);
        });

        // قم بإنشاء كتلة البيانات
        var ws = XLSX.utils.aoa_to_sheet(tableData);

        // قم بإنشاء ملف Excel وتنزيله
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'table_data.xlsx');
    });
});

