// app.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('playerSearch');
    // const groupFilter = document.getElementById('groupFilter'); // 已移除
    const rankingBody = document.getElementById('rankingBody');
    const rows = rankingBody.getElementsByTagName('tr');

    // --- 查找功能 ---
    function filterRankings() {
        const searchText = searchInput.value.toLowerCase();
        
        // 组别筛选逻辑已移除

        Array.from(rows).forEach(row => {
            // 查找逻辑基于“姓名”（索引 1）
            const name = row.cells[1].textContent.toLowerCase(); 
            
            const matchesSearch = name.includes(searchText);

            if (matchesSearch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('keyup', filterRankings);
    // groupFilter.addEventListener('change', filterRankings); // 已移除

    // --- 排序功能 (更新索引) ---
    window.sortTable = function(n) {
        let switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        switching = true;
        dir = "asc"; 
        
        while (switching) {
            switching = false;
            
            for (i = 0; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                
                // 检查是否是数字列 (例如: 排名(0), 总积分(3), 上周积分(4))
                // 用时(2)是文本格式 (5h 45m)，排序处理会比较复杂，此处仅对积分和排名进行数字排序。
                const isNumeric = (n === 0 || n === 3 || n === 4); 
                let xContent = isNumeric ? parseFloat(x.innerHTML) : x.innerHTML.toLowerCase();
                let yContent = isNumeric ? parseFloat(y.innerHTML) : y.innerHTML.toLowerCase();

                if (dir === "asc") {
                    if (xContent > yContent) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (xContent < yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
});