/**
 * unify_footer.js
 * Replaces the footer in all HTML files across the website with a unified standard footer.
 */
const fs = require('fs');
const path = require('path');

// ─── Canonical footer HTML ────────────────────────────────────────────────────
// Uses relative-path-aware prefix injected per file
function buildFooter(prefix) {
  return `  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- TENTANG KAMI -->
        <div class="footer-section">
          <h5>TENTANG KAMI</h5>
          <ul>
            <li><a href="${prefix}tentang/index.html">Profil</a></li>
            <li><a href="${prefix}tentang/visi-misi.html">Visi &amp; Misi</a></li>
            <li><a href="${prefix}tentang/redaksi.html">Redaksi</a></li>
            <li><a href="${prefix}tentang/proses.html">Proses Redaksi</a></li>
            <li><a href="${prefix}tentang/kontak.html">Hubungi Kami</a></li>
          </ul>
        </div>
        <!-- KATEGORI BERITA -->
        <div class="footer-section">
          <h5>KATEGORI BERITA</h5>
          <ul>
            <li><a href="${prefix}kategori/edukasi.html">Edukasi</a></li>
            <li><a href="${prefix}kategori/ekonomi.html">Ekonomi</a></li>
            <li><a href="${prefix}kategori/hiburan.html">Hiburan</a></li>
            <li><a href="${prefix}kategori/kriminal.html">Kriminal</a></li>
            <li><a href="${prefix}kategori/olahraga.html">Olahraga</a></li>
            <li><a href="${prefix}kategori/politik.html">Politik</a></li>
            <li><a href="${prefix}kategori/teknologi.html">Teknologi</a></li>
          </ul>
        </div>
        <!-- IKUTI KAMI -->
        <div class="footer-section">
          <h5>IKUTI KAMI</h5>
          <ul class="footer-social-list">
            <li><a href="https://facebook.com" target="_blank"><i class="fa-brands fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank"><i class="fa-brands fa-x-twitter"></i> X (Twitter)</a></li>
            <li><a href="https://instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank"><i class="fa-brands fa-youtube"></i> YouTube</a></li>
            <li><a href="https://tiktok.com" target="_blank"><i class="fa-brands fa-tiktok"></i> TikTok</a></li>
          </ul>
        </div>
        <!-- KEBIJAKAN -->
        <div class="footer-section">
          <h5>KEBIJAKAN</h5>
          <ul>
            <li><a href="#">Kebijakan Privasi</a></li>
            <li><a href="#">Syarat &amp; Ketentuan</a></li>
            <li><a href="#">Advertise</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Mediya - Portal Berita Indonesia. Semua hak cipta dilindungi. | Diterbitkan dengan <i class="fa-solid fa-heart" style="color: red;"></i> untuk Anda</p>
      </div>
    </div>
  </footer>`;
}

// ─── Collect all HTML files ───────────────────────────────────────────────────
function getAllHtmlFiles(dirPath, result = []) {
  fs.readdirSync(dirPath).forEach(file => {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) {
      if (!file.startsWith('.') && file !== 'assets' && file !== 'node_modules') {
        getAllHtmlFiles(full, result);
      }
    } else if (file.endsWith('.html') && file !== 'components') {
      result.push(full);
    }
  });
  return result;
}

const root = __dirname;
const files = getAllHtmlFiles(root);

// ─── Determine relative prefix for each file ────────────────────────────────
function getPrefix(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1; // number of directories deep
  return depth === 0 ? '' : '../'.repeat(depth);
}

let updated = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip files without a footer
  if (!content.includes('<footer')) return;

  const prefix = getPrefix(filePath);
  const newFooter = buildFooter(prefix);

  // Replace everything between <!-- FOOTER --> (or start of <footer) and </footer>
  // Handles both cases: with and without the <!-- FOOTER --> comment
  const footerRegex = /(?:<!-- FOOTER -->[\s\S]*?)?<footer[\s\S]*?<\/footer>/;
  if (!footerRegex.test(content)) {
    console.log(`  SKIP (no footer match): ${path.relative(root, filePath)}`);
    return;
  }

  const newContent = content.replace(footerRegex, newFooter);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    updated++;
    console.log(`  Updated: ${path.relative(root, filePath)}`);
  }
});

console.log(`\nDone. ${updated} files updated.`);
