// Ambil data artikel
async function loadArticles() {
    const res = await fetch("data.json");
    return await res.json();
}

// Tampilkan daftar artikel
async function showArticles(filter = "") {
    const articles = await loadArticles();
    const container = document.getElementById("articles");

    if (!container) return; // untuk artikel.html

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(filter.toLowerCase()) ||
        a.content.toLowerCase().includes(filter.toLowerCase())
    );

    container.innerHTML = filtered.map(a => `
        <a href="artikel.html?id=${a.id}" class="card">
            <h3>${a.title}</h3>
            <p>${a.content.substring(0, 90)}...</p>
            <small>${a.date}</small>
        </a>
    `).join("");
}

// Search Realtime
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", e => {
        showArticles(e.target.value);
    });
    showArticles(); // pertama kali
}

// Halaman Artikel
async function loadSingleArticle() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const articles = await loadArticles();
    const article = articles.find(a => a.id == id);

    if (!article) return;

    document.getElementById("title").innerText = article.title;
    document.getElementById("date").innerText = article.date;
    document.getElementById("content").innerText = article.content;

    // Tampilkan PDF
    if (article.pdf) {
        const pdfFrame = document.getElementById("pdfViewer");
        if (pdfFrame) {
            pdfFrame.src = article.pdf;
        }
    }

    
}

loadSingleArticle();

