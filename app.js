document.addEventListener('DOMContentLoaded', () => {
    const rankingBody = document.getElementById('rankingBody');
    const searchInput = document.getElementById('playerSearch');
    let allPlayers = []; // 存储原始数据

    // 1. 获取数据
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allPlayers = data;
            render(allPlayers);
        })
        .catch(() => {
            rankingBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">无法读取 data.json</td></tr>';
        });

    // 2. 渲染表格
    function render(data) {
        if(data.length === 0) {
            rankingBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">未找到选手</td></tr>';
            return;
        }
        rankingBody.innerHTML = data.map(p => `
            <tr>
                <td><strong>${p.rank}</strong></td>
                <td>${p.name}</td>
                <td>${p.time}</td>
                <td>${p.total}</td>
                <td>${p.lastWeek}</td>
            </tr>
        `).join('');
    }

    // 3. 搜索功能
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = allPlayers.filter(p => p.name.toLowerCase().includes(val));
        render(filtered);
    });

    // 4. 排序逻辑
    let sortDir = true;
    window.sortTable = (idx) => {
        const keys = ['rank', 'name', 'time', 'total', 'lastWeek'];
        const key = keys[idx];
        sortDir = !sortDir;

        const sorted = [...allPlayers].sort((a, b) => {
            let v1 = a[key];
            let v2 = b[key];
            if(typeof v1 === 'number') return sortDir ? v1 - v2 : v2 - v1;
            return sortDir ? v1.localeCompare(v2) : v2.localeCompare(v1);
        });
        render(sorted);
    };
});