const tableTabs = document.getElementsByClassName("table-tabs");
for (let j = 0; j < tableTabs.length; j++) {
    const tableContainer = tableTabs[j].getElementsByClassName("table-container");
    let allRows = [];
    for (let i = 0; i < tableContainer.length; i++) {
        const tableRows = tableContainer[i].getElementsByClassName("table-rows");
        allRows.push(Array.from(tableRows))
    }
    const actions = index => {
        const tableBody = tableContainer[index]?.getElementsByClassName("table-body")[0];
        const searchTable = tableTabs[j]?.getElementsByClassName("search-table")[0];
        const tableRowsNumber = tableTabs[j]?.getElementsByClassName("table-rows-number");
        const tablePages = tableTabs[j]?.getElementsByClassName("table-pages")[0];
        const tableStatus = tableTabs[j]?.getElementsByClassName("table-status")[0];
        const tablePaganiteNext = tableTabs[j]?.getElementsByClassName("table-paganite-next")[0];
        const tablePaganitePrev = tableTabs[j]?.getElementsByClassName("table-paganite-prev")[0];
        const emptyMessage = tableContainer[index]?.getElementsByClassName("empty-message")[0];
        const colFilter = document.getElementsByClassName("col-filter");
        const colFilterMenu = colFilter[index]?.getElementsByClassName("dropdown-menu")[0];
        const checkFilter = colFilterMenu?.getElementsByTagName("input");
        const tableHead = document.getElementsByClassName("tableHead")[index];
        const rows = allRows[index];
        let rowsNumber = tableRowsNumber[0].value == "all" ? rows.length : Number(tableRowsNumber[0].value)
        let activePage = 1;
        const checkBtns = (pages) => {
            if (activePage == 1) {
                if (tablePaganitePrev) {
                    tablePaganitePrev.disabled = true;
                }
            } else {
                if (tablePaganitePrev) {
                    tablePaganitePrev.disabled = false;
                }
            }
            if (activePage == pages) {
                if (tablePaganiteNext) {
                    tablePaganiteNext.disabled = true;
                }
            } else {
                if (tablePaganiteNext) {
                    tablePaganiteNext.disabled = false;
                }
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
        const clearFilter = () => {
            while (colFilterMenu?.children.length) colFilterMenu.children[0].remove()
        }
        clearFilter()
        Array.from(tableHead.children).some((ch, i) => {
            if (i !== 0 && i !== 1) {
                if (ch.classList.contains("col-filter")) return;
                let values = []
                rows.forEach(row => {
                    if (row.children[i]) {
                        values.push(row.children[i].textContent.replace(/[\r\n]/gm, '').replace(/[\t]/gm, ' ').trim().split(" ").filter(str => str !== "").join(" "))
                    }
                })
                const newObj = {
                    index: i,
                    label: ch.textContent.replace(/[\r\n]/gm, '').replace(/[\t]/gm, ' ').trim().split(" ").filter(str => str !== "").join(" "),
                    values,
                    show: i <= 8
                }
                cols.push(newObj)
                colFilterMenu?.appendChild(createElementFromHTML(dropdownItemSchema(newObj.label, newObj.show)))
            }
        })
        const updateTable = (newRows) => {
            while (tableBody?.children[0]) {
                tableBody.children[0].remove()
            }
            if (newRows.length) {
                emptyMessage?.classList.add("d-none")
            } else {
                emptyMessage?.classList.remove("d-none")
            }
            let start = (activePage - 1) * rowsNumber;
            let end = activePage * rowsNumber;
            Array.from(newRows).forEach((row, index) => {
                Array.from(row.children).forEach(ch => ch.classList.remove("d-none"))
                cols.filter(c => c.show == false).forEach(c => {
                    row.children[c.index].classList.add("d-none")
                });
                if (index >= start && index < end) {
                    tableBody?.appendChild(row);
                }
            })
            let pages = Math.ceil(newRows.length / rowsNumber);
            checkBtns(pages)
            if (tablePages) {
                tablePages.innerHTML = `${activePage}/${pages == 0 ? 1 : pages}`
            }
            if (tableStatus) {
                tableStatus.innerHTML = `${start + 1}-${end > newRows.length ? newRows.length : end} of ${newRows.length}`
            }
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

        searchFilter(searchTable?.value)

        searchTable?.addEventListener("input", e => searchFilter(e.target.value))

        const checkHead = () => {
            Array.from(tableHead?.children).forEach(ch => {
                ch.classList.remove("d-none");
            })
            cols.filter(c => c.show == false).forEach(c => {
                tableHead?.children[c.index].classList.add("d-none")
            });
        }

        checkHead()
        if (checkFilter) {
            Array.from(checkFilter).forEach((chk, i) => {
                chk.addEventListener("change", e => {
                    cols[i].show = e.target.checked;
                    checkHead()
                    searchFilter(searchTable?.value)
                })
            })
        }

        Array.from(tableRowsNumber).forEach(trn => {
            trn.addEventListener("change", e => {
                for (let i = 0; i < tableRowsNumber.length; i++) tableRowsNumber[i].value = e.target.value
                rowsNumber = e.target.value == "all" ? rows.length : Number(e.target.value);
                activePage = 1;
                searchFilter(searchTable?.value)
            })
        })

        tablePaganiteNext?.addEventListener("click", () => {
            activePage++;
            searchFilter(searchTable?.value);

        })

        tablePaganitePrev?.addEventListener("click", () => {
            activePage--;
            searchFilter(searchTable?.value);
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





// input all chick
$(document).ready(function () {
    // عند النقر على الصندوق الرئيسي
    $('.checkParent').on('change', function () {
        // استخدم $(this).is(':checked') للتحقق مما إذا كان صندوق الاختيار الرئيسي محددًا أم لا
        var isChecked = $(this).is(':checked');

        // قم بتحديد صناديق الأطفال في نفس الجدول
        $(this).closest('table').find('.checkChild').prop('checked', isChecked);

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
        var allChildrenChecked = $(this).closest('table').find('.checkChild').length === $(this).closest('table').find('.checkChild:checked').length;
        $(this).closest('table').find('.checkParent').prop('checked', allChildrenChecked);
    });
});

