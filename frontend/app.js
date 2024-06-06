document.addEventListener('DOMContentLoaded', async () => {
    const astrologersDiv = document.getElementById('astrologers');
    const distributeBtn = document.getElementById('distributeBtn');

    const response = await fetch('http://localhost:5000/api/astrologers');
    const astrologers = await response.json();

    astrologersDiv.innerHTML = astrologers.map(a => `
        <div>
            <h2>${a.name}</h2>
            <p>Connections: ${a.connections}</p>
            <p>Top Astrologer: ${a.isTop}</p>
            <button onclick="toggleTopAstrologer('${a._id}')">Toggle Top</button>
        </div>
    `).join('');

    distributeBtn.addEventListener('click', async () => {
        const users = Array(2000).fill().map((_, i) => ({ id: i, name: `User${i}` }));
        await fetch('http://localhost:5000/api/distribute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ users })
        });
        window.location.reload();
    });
});

async function toggleTopAstrologer(id) {
    await fetch(`http://localhost:5000/api/astrologers/${id}/toggle`, { method: 'PUT' });
    window.location.reload();
}
