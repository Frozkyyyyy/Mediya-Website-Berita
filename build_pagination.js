/**
 * build_pagination.js
 * 
 * 1. Rebuilds index.html with ALL 35 articles + client-side JS pagination (8 per page)
 * 2. Adds prev/next navigation to all berita article pages
 */
const fs = require('fs');
const path = require('path');

const categories = ['edukasi', 'ekonomi', 'hiburan', 'kriminal', 'olahraga', 'politik', 'teknologi'];
const beritaDir = path.join(__dirname, 'berita');
const indexFile = path.join(__dirname, 'index.html');

// ─── 1. Collect all article metadata by scraping generated HTML ───────────────

function extractMeta(html) {
  const titleMatch = html.match(/<h1 class="article-title">([\s\S]*?)<\/h1>/);
  const imgMatch = html.match(/<img src="([^"]+)" alt=".*?" class="article-hero-img"/);
  const catMatch = html.match(/<span class="featured-category">([^<]+)<\/span>/);
  const dateMatch = html.match(/<i class="fa-regular fa-calendar"><\/i>\s*([^<]+)<\/span>/);
  const snippetMatch = html.match(/<div class="article-content">\s*<p>([\s\S]{20,200}?)\.\.\./);

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    img: imgMatch ? imgMatch[1] : '',
    cat: catMatch ? catMatch[1].trim().toLowerCase() : '',
    catCap: catMatch ? catMatch[1].trim() : '',
    date: dateMatch ? dateMatch[1].trim() : '',
    snippet: snippetMatch ? snippetMatch[1].replace(/<[^>]*>/g, '').trim().substring(0, 140) + '...' : '',
  };
}

const allArticles = [];

categories.forEach(cat => {
  const catDir = path.join(beritaDir, cat);
  if (!fs.existsSync(catDir)) return;
  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.html')).sort();
  files.forEach((file, idx) => {
    const filePath = path.join(catDir, file);
    const html = fs.readFileSync(filePath, 'utf8');
    const meta = extractMeta(html);
    allArticles.push({
      ...meta,
      cat,
      link: `/berita/${cat}/${file}`,
      file,
      idx,
      totalInCat: files.length,
      prevFile: idx > 0 ? files[idx - 1] : null,
      nextFile: idx < files.length - 1 ? files[idx + 1] : null,
    });
  });
});

console.log(`Collected ${allArticles.length} articles.`);

// ─── 2. Add prev/next navigation to every article page ───────────────────────

allArticles.forEach(article => {
  const filePath = path.join(beritaDir, article.cat, article.file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove existing article-nav if already added
  html = html.replace(/\s*<!-- ARTICLE NAV -->[\s\S]*?<!-- END ARTICLE NAV -->/, '');

  const prevLink = article.prevFile
    ? `<a class="article-nav-btn" href="/berita/${article.cat}/${article.prevFile}"><i class="fa-solid fa-arrow-left"></i> Artikel Sebelumnya</a>`
    : `<span class="article-nav-btn disabled"><i class="fa-solid fa-arrow-left"></i> Artikel Sebelumnya</span>`;

  const nextLink = article.nextFile
    ? `<a class="article-nav-btn next" href="/berita/${article.cat}/${article.nextFile}">Artikel Berikutnya <i class="fa-solid fa-arrow-right"></i></a>`
    : `<span class="article-nav-btn next disabled">Artikel Berikutnya <i class="fa-solid fa-arrow-right"></i></span>`;

  const navHtml = `
  <!-- ARTICLE NAV -->
  <div class="article-nav-wrapper">
    <div class="article-nav">
      ${prevLink}
      <a class="article-nav-btn back-cat" href="/kategori/${article.cat}.html"><i class="fa-solid fa-list"></i> Semua ${article.catCap}</a>
      ${nextLink}
    </div>
  </div>
  <!-- END ARTICLE NAV -->`;

  // Inject before </div> that closes main-container, i.e. before </footer>
  html = html.replace(/(\s*<!-- FOOTER -->)/, `\n${navHtml}\n$1`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  nav added to ${article.cat}/${article.file}`);
});

// ─── 3. Rebuild index.html articles section with all 35 cards ─────────────────

const CARDS_PER_PAGE = 8;

let allCardsHtml = '';
allArticles.forEach((a, i) => {
  const fallbackImg = '../../assets/img/featured.jpg';
  const imgSrc = a.img || fallbackImg;
  allCardsHtml += `        <div class="article-card pag-card" data-index="${i}" onclick="window.location.href='${a.link}'" style="${i >= CARDS_PER_PAGE ? 'display:none;' : ''}">
          <img src="${imgSrc}" alt="${a.title.replace(/"/g, '&quot;')}" class="article-card-image">
          <div class="article-card-content">
            <span class="article-card-category">${a.catCap}</span>
            <h3>${a.title}</h3>
            <p>${a.snippet}</p>
            <div class="article-card-meta">${a.date} • Antara News</div>
          </div>
        </div>\n`;
});

const totalPages = Math.ceil(allArticles.length / CARDS_PER_PAGE);

// Build pagination buttons HTML (static placeholder, JS will re-render)
let paginationHtml = `      <!-- PAGINATION -->
      <div class="pagination" id="pagination">
        <span class="active" data-page="1">1</span>`;
for (let p = 2; p <= totalPages; p++) {
  paginationHtml += `\n        <a href="#" data-page="${p}">${p}</a>`;
}
paginationHtml += `
        <a href="#" id="pag-next" data-page="2">Selanjutnya →</a>
      </div>`;

// JS script for pagination
const pagScript = `
  <script>
    (function() {
      const CARDS_PER_PAGE = ${CARDS_PER_PAGE};
      const cards = Array.from(document.querySelectorAll('.pag-card'));
      const totalPages = ${totalPages};
      let currentPage = 1;

      function showPage(page) {
        currentPage = page;
        const start = (page - 1) * CARDS_PER_PAGE;
        const end = start + CARDS_PER_PAGE;
        cards.forEach((c, i) => {
          c.style.display = (i >= start && i < end) ? '' : 'none';
        });
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function renderPagination() {
        const container = document.getElementById('pagination');
        if (!container) return;
        let html = '';
        if (currentPage > 1) html += '<a href="#" data-page="' + (currentPage - 1) + '" class="pag-prev">← Sebelumnya</a>';
        for (let p = 1; p <= totalPages; p++) {
          if (p === currentPage) {
            html += '<span class="active">' + p + '</span>';
          } else {
            html += '<a href="#" data-page="' + p + '">' + p + '</a>';
          }
        }
        if (currentPage < totalPages) html += '<a href="#" data-page="' + (currentPage + 1) + '" class="pag-next">Selanjutnya →</a>';
        container.innerHTML = html;
        container.querySelectorAll('a[data-page]').forEach(btn => {
          btn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(parseInt(this.dataset.page));
          });
        });
      }

      renderPagination();
    })();
  </script>`;

// Read current index.html and replace the articles + pagination sections
let indexContent = fs.readFileSync(indexFile, 'utf8');

// Replace articles grid
const gridRegex = /<!-- ARTICLES GRID -->[\s\S]*?<\/section>|<!-- DYNAMIC ARTICLES START -->[\s\S]*?<!-- DYNAMIC ARTICLES END -->/;
const newGrid = `<!-- DYNAMIC ARTICLES START -->
      <section class="articles-grid" id="articles-grid">
${allCardsHtml}      </section>
      <!-- DYNAMIC ARTICLES END -->`;
indexContent = indexContent.replace(gridRegex, newGrid);

// Replace pagination block
const pagRegex = /<!-- PAGINATION -->[\s\S]*?<\/div>\s*(\r?\n\s*<\/main>)/;
indexContent = indexContent.replace(pagRegex, `${paginationHtml}\n    </main>`);

// Inject the pagination JS before </body>
indexContent = indexContent.replace('</body>', `${pagScript}\n</body>`);

fs.writeFileSync(indexFile, indexContent, 'utf8');
console.log(`\nindex.html rebuilt with ${allArticles.length} articles across ${totalPages} pages.`);

// ─── 4. Rebuild Category Pages (kategori/*.html) ─────────────────────────────

categories.forEach(cat => {
  const catFile = path.join(__dirname, 'kategori', `${cat}.html`);
  if (!fs.existsSync(catFile)) return;
  
  let catContent = fs.readFileSync(catFile, 'utf8');
  
  const catArticles = allArticles.filter(a => a.cat === cat);
  let catCardsHtml = '';
  
  catArticles.forEach((a, i) => {
    const fallbackImg = '../assets/img/featured.jpg';
    const imgSrc = a.img || fallbackImg;
    catCardsHtml += `        <div class="article-card" onclick="window.location.href='${a.link}'">
          <img src="${imgSrc}" alt="${a.title.replace(/"/g, '&quot;')}" class="article-card-image">
          <div class="article-card-content">
            <span class="article-card-category">${a.catCap}</span>
            <h3>${a.title}</h3>
            <p>${a.snippet}</p>
            <div class="article-card-meta">${a.date} • Antara News</div>
          </div>
        </div>\n`;
  });
  
  const catGridHtml = `<!-- DYNAMIC ARTICLES START -->
      <section class="articles-grid">
${catCardsHtml}      </section>
      <!-- DYNAMIC ARTICLES END -->`;
      
  catContent = catContent.replace(/<section class="articles-grid">[\s\S]*?<\/section>|<!-- DYNAMIC ARTICLES START -->[\s\S]*?<!-- DYNAMIC ARTICLES END -->/, catGridHtml);
  
  // Clean up pagination since it's just 5 items per category right now
  const catPagRegex = /<div class="pagination">[\s\S]*?<\/div>|<!-- PAGINATION -->[\s\S]*?<\/div>/;
  catContent = catContent.replace(catPagRegex, `<!-- PAGINATION -->
      <div class="pagination">
        <span class="active">1</span>
      </div>`);
      
  fs.writeFileSync(catFile, catContent, 'utf8');
  console.log(`Updated kategori/${cat}.html with ${catArticles.length} articles.`);
});

