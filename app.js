document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('playerSearch');
    const rankingBody = document.getElementById('rankingBody');
    const rows = rankingBody.getElementsByTagName('tr');

    // 搜索功能：监听姓名列
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        
        for (let i = 0; i < rows.length; i++) {
            const nameColumn = rows[i].getElementsByTagName('td')[1];
            if (nameColumn) {
                const txtValue = nameColumn.textContent || nameColumn.innerText;
                rows[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
            }
        }
    });

    // 排序功能
    window.sortTable = function(n) {
        let table = document.getElementById("rankingTable");
        let switching = true;
        let dir = "asc";
        let switchcount = 0;

        while (switching) {
            switching = false;
            let rowsArray = table.rows;
            
            for (var i = 1; i < (rowsArray.length - 1); i++) {
                var shouldSwitch = false;
                var x = rowsArray[i].getElementsByTagName("TD")[n];
                var y = rowsArray[i + 1].getElementsByTagName("TD")[n];

                // 判断是否为数字列进行逻辑比较 (排名、总积分、上周积分)
                let xVal = (n === 0 || n === 3 || n === 4) ? parseFloat(x.innerHTML) : x.innerHTML.toLowerCase();
                let yVal = (n === 0 || n === 3 || n === 4) ? parseFloat(y.innerHTML) : y.innerHTML.toLowerCase();

                if (dir == "asc") {
                    if (xVal > yVal) { shouldSwitch = true; break; }
                } else if (dir == "desc") {
                    if (xVal < yVal) { shouldSwitch = true; break; }
                }
            }
            if (shouldSwitch) {
                rowsArray[i].parentNode.insertBefore(rowsArray[i + 1], rowsArray[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    };
});