const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const parser = new Parser();

const categories = {
  'edukasi': 'humaniora',
  'ekonomi': 'ekonomi',
  'hiburan': 'hiburan',
  'kriminal': 'hukum',
  'olahraga': 'olahraga',
  'politik': 'politik',
  'teknologi': 'tekno'
};

const baseUrl = 'https://www.antaranews.com/rss/';
const outputDir = path.join(__dirname, 'berita');
const indexFile = path.join(__dirname, 'index.html');

// Helper to format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

// Generate Article HTML
function generateArticleHTML(item, category, title, content, date, imageUrl, originalLink) {
  const catCapitalized = category.charAt(0).toUpperCase() + category.slice(1);
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Mediya</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <script>if(localStorage.getItem('theme')==='dark'||(!('theme' in localStorage)&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.setAttribute('data-theme','dark');</script>
</head>
<body>
  <!-- NAVBAR -->
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-logo" onclick="window.location.href='/'" style="display: flex; align-items: center; cursor: pointer;">
        <img src="/assets/img/logo.png" alt="Mediya Logo" style="height: 40px; margin-right: 12px; vertical-align: middle;">
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <span class="logo-title" style="font-size: 26px; font-weight: 800; background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 1px; line-height: 1.1;">Mediya</span>
          <span class="logo-tagline" style="font-size: 11px; font-weight: 500; color: var(--text-light); letter-spacing: 0.5px; text-transform: uppercase;">Portal Berita Terpercaya</span>
        </div>
      </div>
      <ul class="navbar-menu">
        <li><a href="/">Beranda</a></li>
        <li><a href="/kategori/edukasi.html">Edukasi</a></li>
        <li><a href="/kategori/ekonomi.html">Ekonomi</a></li>
        <li><a href="/kategori/hiburan.html">Hiburan</a></li>
        <li><a href="/kategori/kriminal.html">Kriminal</a></li>
        <li><a href="/kategori/olahraga.html">Olahraga</a></li>
        <li><a href="/kategori/politik.html">Politik</a></li>
        <li><a href="/kategori/teknologi.html">Teknologi</a></li>
        <li><a href="/tentang/index.html">Tentang</a></li>
      </ul>
      <div class="navbar-search">
        <input type="text" placeholder="Cari berita...">
        <button><i class="fa-solid fa-magnifying-glass"></i></button>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode"><i class="fa-solid fa-moon"></i></button>
      </div>
    </div>
  </nav>

  <!-- BREADCRUMBS -->
  <div class="breadcrumbs">
    <div class="breadcrumbs-container">
      <a href="/">Beranda</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="/kategori/${category}.html">${catCapitalized}</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span>${title}</span>
    </div>
  </div>

  <div class="main-container">
    <main>
      <article class="article-detail">
        <div class="article-header">
          <span class="featured-category">${catCapitalized}</span>
          <h1 class="article-title">${title}</h1>
          <div class="article-meta-wrapper">
            <div class="article-author-meta">
              <div class="author-avatar"><i class="fa-solid fa-user-tie"></i></div>
              <div class="author-info">
                <span class="author-name">Tim Redaksi Mediya</span>
                <span class="author-date">${date}</span>
              </div>
            </div>
            <div class="article-share">
              <a href="#" class="share-btn share-fb" title="Bagikan ke Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" class="share-btn share-tw" title="Bagikan ke X/Twitter"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#" class="share-btn share-wa" title="Bagikan ke WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
              <a href="#" class="share-btn share-link" title="Salin Tautan"><i class="fa-solid fa-link"></i></a>
            </div>
          </div>
        </div>
        
        <div class="article-hero-container">
          <img src="${imageUrl}" alt="${title.replace(/"/g, '&quot;')}" class="article-hero-img">
          <div class="article-image-caption">Ilustrasi: ${title}</div>
        </div>
        
        <div class="article-content">
          <p>${content}</p>
        </div>
        
        <div class="article-tags">
          <span class="tags-label"><i class="fa-solid fa-tags"></i> Tags:</span>
          <a href="/kategori/${category}.html" class="tag-item">${catCapitalized}</a>
          <a href="#" class="tag-item">Berita Terkini</a>
          <a href="#" class="tag-item">Trending</a>
        </div>
      </article>
    </main>
    <aside class="sidebar">
      <div class="sidebar-section">
        <h4><i class="fa-solid fa-thumbtack" style="color: var(--primary-color);"></i> KATEGORI POPULER</h4>
        <div class="sidebar-item"><a href="/kategori/edukasi.html">Edukasi</a></div>
        <div class="sidebar-item"><a href="/kategori/ekonomi.html">Ekonomi</a></div>
        <div class="sidebar-item"><a href="/kategori/hiburan.html">Hiburan</a></div>
        <div class="sidebar-item"><a href="/kategori/kriminal.html">Kriminal</a></div>
        <div class="sidebar-item"><a href="/kategori/olahraga.html">Olahraga</a></div>
        <div class="sidebar-item"><a href="/kategori/politik.html">Politik</a></div>
        <div class="sidebar-item"><a href="/kategori/teknologi.html">Teknologi</a></div>
      </div>
      <div class="sidebar-section">
        <h4><i class="fa-solid fa-fire" style="color: var(--primary-color);"></i> TRENDING</h4>
        <div class="trending-item"><div class="trending-number">1</div><div class="trending-content"><h5>Berita Utama Hari Ini</h5><p>12.5K views</p></div></div>
        <div class="trending-item"><div class="trending-number">2</div><div class="trending-content"><h5>Info Terkini Nasional</h5><p>10.2K views</p></div></div>
        <div class="trending-item"><div class="trending-number">3</div><div class="trending-content"><h5>Perkembangan Kasus Terbaru</h5><p>9.8K views</p></div></div>
      </div>
      <div class="sidebar-section">
        <h4><i class="fa-solid fa-envelope" style="color: var(--primary-color);"></i> NEWSLETTER</h4>
        <p style="font-size: 13px; color: var(--text-light); margin-bottom: 15px;">Dapatkan berita terbaru langsung ke email Anda setiap hari.</p>
        <input type="email" placeholder="Email Anda" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; font-size: 13px; margin-bottom: 10px;">
        <button style="width: 100%; padding: 10px; background-color: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 13px;">Subscribe</button>
      </div>
    </aside>
  </div>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h5>Tentang Kami</h5>
          <p style="font-size: 13px; line-height: 1.6; color: #8f9bb3;">Portal berita terdepan yang menyajikan informasi aktual, tajam, dan terpercaya untuk masyarakat Indonesia.</p>
        </div>
        <div class="footer-section">
          <h5>Kategori</h5>
          <ul>
            <li><a href="/kategori/politik.html">Politik</a></li>
            <li><a href="/kategori/teknologi.html">Teknologi</a></li>
            <li><a href="/kategori/ekonomi.html">Ekonomi</a></li>
            <li><a href="/kategori/olahraga.html">Olahraga</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Ikuti Kami</h5>
          <div style="display: flex; gap: 15px; margin-top: 15px; justify-content: center;">
            <a href="#" style="color: white; font-size: 20px;"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" style="color: white; font-size: 20px;"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" style="color: white; font-size: 20px;"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" style="color: white; font-size: 20px;"><i class="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Portal Berita Indonesia. Semua hak cipta dilindungi. | Diterbitkan dengan <i class="fa-solid fa-heart" style="color: red;"></i> untuk Anda</p>
      </div>
    </div>
  </footer>

  <script src="../../assets/js/theme.js"></script>
</body>
</html>`;
}

function updateFeaturedOnly(allArticles) {
  if (allArticles.length === 0) return;

  // Pick the first politics article (or any first) as featured hero
  const featured = allArticles.find(a => a.category === 'politik') || allArticles[0];

  const featuredHtml = `      <!-- DYNAMIC FEATURED START -->
      <section class="featured-section">
        <div class="featured-article"
          style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url('${featured.imageUrl}'); background-size: cover; background-position: center;"
          onclick="window.location.href='${featured.link}'">
          <div class="featured-article-content">
            <span class="featured-category">${featured.catCapitalized}</span>
            <h2>${featured.title}</h2>
            <div class="featured-article-meta">
              ${featured.date} • Sumber: Antara News
            </div>
          </div>
        </div>
      </section>
      <!-- DYNAMIC FEATURED END -->`;

  let indexContent = fs.readFileSync(indexFile, 'utf8');
  const featuredRegex = /<!-- DYNAMIC FEATURED START -->[\s\S]*?<!-- DYNAMIC FEATURED END -->/;
  indexContent = indexContent.replace(featuredRegex, featuredHtml);
  fs.writeFileSync(indexFile, indexContent, 'utf8');
  console.log('Featured article updated.');
}

async function fetchAllNews() {
  let allArticles = [];

  for (const [localCat, feedCat] of Object.entries(categories)) {
    const feedUrl = `${baseUrl}${feedCat}.xml`;
    console.log(`Fetching ${localCat} from ${feedUrl}...`);
    try {
      const feed = await parser.parseURL(feedUrl);
      
      const catDir = path.join(outputDir, localCat);
      if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

      const items = feed.items.slice(0, 5);
      
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        let imageUrl = '../../assets/img/featured.jpg';
        const imgMatch = item.content ? item.content.match(/<img.*?src="(.*?)"/) : null;
        if (imgMatch) imageUrl = imgMatch[1];
        else {
           const descMatch = item.description ? item.description.match(/<img.*?src="(.*?)"/) : null;
           if (descMatch) imageUrl = descMatch[1];
        }
        
        let cleanContent = item.contentSnippet || '';
        if (!cleanContent && item.content) {
            cleanContent = item.content.replace(/<[^>]*>?/gm, '');
        }

        // Fetch full article content from URL
        let fullContent = cleanContent;
        try {
          console.log(`Scraping ${item.link}...`);
          const { data } = await axios.get(item.link);
          const $ = cheerio.load(data);
          
          // Grab HD image from article meta tags to fix broken thumbnails
          const metaImg = $('meta[property="og:image"]').attr('content');
          if (metaImg) {
            imageUrl = metaImg;
          }

          let scrapedText = $('.wrap__article-detail-content').find('p').map((i, el) => $(el).text()).get().join('</p><p>');
          if (!scrapedText) {
            scrapedText = $('.post-content').find('p').map((i, el) => $(el).text()).get().join('</p><p>');
          }
          if (scrapedText) {
            // Clean up ads, copyright, and reporter info
            scrapedText = scrapedText.replace(/\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);/g, '');
            scrapedText = scrapedText.replace(/Pewarta:.*?Editor:.*?(?=<\/p>)/g, '');
            scrapedText = scrapedText.replace(/Copyright © ANTARA 202\d/g, '');
            scrapedText = scrapedText.replace(/Dilarang keras mengambil konten, melakukan crawling atau pengindeksan otomatis untuk AI di situs web ini tanpa izin tertulis dari Kantor Berita ANTARA\./g, '');
            // Clean up any empty p tags caused by replacements
            scrapedText = scrapedText.replace(/<p>\s*<\/p>/g, '');
            
            fullContent = scrapedText;
            console.log(`SUCCESS! Scraped length: ${scrapedText.length}`);
          }
        } catch (err) {
          console.error(`Failed to scrape full content for ${item.link}:`, err.message);
        }

        const dateFormatted = formatDate(item.pubDate);
        const fileName = `${localCat}${index + 1}.html`;
        const filePath = path.join(catDir, fileName);
        
        const html = generateArticleHTML(item, localCat, item.title, fullContent, dateFormatted, imageUrl, item.link);
        fs.writeFileSync(filePath, html);
        console.log(`Generated ${filePath}`);

        allArticles.push({
          category: localCat,
          catCapitalized: localCat.charAt(0).toUpperCase() + localCat.slice(1),
          title: item.title,
          snippet: cleanContent.substring(0, 150) + '...',
          imageUrl: imageUrl,
          link: `/berita/${localCat}/${fileName}`,
          date: dateFormatted
        });
      }
      
    } catch (e) {
      console.error(`Failed to fetch ${localCat}: `, e);
    }
  }

  // 1. Update only the featured hero (keeps index in sync)
  updateFeaturedOnly(allArticles);

  // 2. Run build_pagination.js to rebuild full articles grid from /berita/ files
  console.log('\nRunning build_pagination.js to sync index.html...');
  const { execSync } = require('child_process');
  try {
    execSync('node build_pagination.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (e) {
    console.error('build_pagination.js failed:', e.message);
  }

  // 3. Run unify_footer.js to keep footer consistent
  console.log('\nRunning unify_footer.js...');
  try {
    execSync('node unify_footer.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (e) {
    console.error('unify_footer.js failed:', e.message);
  }

  // 4. Run unify_navbar.js to keep navbar consistent
  console.log('\nRunning unify_navbar.js...');
  try {
    execSync('node unify_navbar.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (e) {
    console.error('unify_navbar.js failed:', e.message);
  }

  console.log('\n✅ All done! Website is fully synced.');
}

fetchAllNews();

