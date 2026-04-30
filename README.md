# Portal Berita Indonesia - Dokumentasi Website

## 📋 Daftar Isi
1. [Struktur Project](#struktur-project)
2. [Panduan Cepat](#panduan-cepat)
3. [Membuat Halaman Baru](#membuat-halaman-baru)
4. [Panduan Styling](#panduan-styling)
5. [Tips dan Trik](#tips-dan-trik)

---

## 📁 Struktur Project

```
website-berita/
├── index.html                 # Halaman utama/beranda
├── assets/
│   ├── css/
│   │   └── style.css         # File CSS utama
│   ├── img/                  # Folder untuk gambar
│   └── js/                   # Folder untuk JavaScript (opsional)
├── components/
│   ├── navbar.html           # Komponen navigasi bar
│   ├── card-berita.html      # Template card berita
│   ├── sidebar.html          # Komponen sidebar
│   └── footer.html           # Komponen footer
├── berita/                   # Folder untuk artikel berita
│   ├── edukasi/              # Kategori Edukasi
│   ├── ekonomi/              # Kategori Ekonomi
│   ├── hiburan/              # Kategori Hiburan
│   ├── kriminal/             # Kategori Kriminal
│   ├── olahraga/             # Kategori Olahraga
│   ├── politik/              # Kategori Politik
│   └── teknologi/            # Kategori Teknologi
├── kategori/
│   ├── edukasi.html
│   ├── ekonomi.html
│   ├── hiburan.html
│   ├── kriminal.html
│   ├── olahraga.html
│   ├── politik.html
│   └── teknologi.html
├── tentang/
│   ├── index.html            # Profil / Tentang Kami
│   ├── kontak.html           # Halaman Kontak
│   ├── proses.html           # Proses Redaksi
│   ├── redaksi.html          # Daftar Redaksi
│   └── visi-misi.html        # Visi & Misi
└── README.md                 # File dokumentasi ini
```

---

## 🚀 Panduan Cepat

### 1. Membuka Website
- Buka file `index.html` dengan browser favorit Anda
- Atau gunakan Live Server di VS Code untuk development

### 2. Navigasi Utama
- **Beranda**: Menampilkan semua berita terbaru
- **Kategori**: Artikel dikelompokkan per kategori (Edukasi, Ekonomi, dll)
- **Tentang**: Informasi tentang portal berita
- **Search**: Fitur pencarian berita

### 3. Warna Utama
- **Warna Merah Utama**: `#cc3333` (untuk highlight, kategori badge)
- **Warna Sekunder**: `#f0f0f0` (background)
- **Teks Gelap**: `#333333`
- **Teks Terang**: `#666666`

---

## ✏️ Membuat Halaman Baru

### Template Halaman Kategori
Gunakan struktur berikut untuk membuat halaman kategori baru:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Deskripsi kategori">
  <title>Nama Kategori | Portal Berita Indonesia</title>
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
  <!-- Navbar (copy dari index.html) -->
  <!-- Main Content dengan grid artikel -->
  <!-- Sidebar -->
  <!-- Footer -->
</body>
</html>
```

### Template Halaman Artikel Detail
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Deskripsi artikel">
  <title>Judul Artikel | Portal Berita</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
</head>
<body>
  <!-- Navbar -->
  <!-- Article Header -->
  <!-- Featured Image -->
  <!-- Article Content (gunakan tag p, h2, h3, ul, ol) -->
  <!-- Author Info -->
  <!-- Share Buttons -->
  <!-- Related Articles -->
  <!-- Footer -->
</body>
</html>
```

---

## 🎨 Panduan Styling

### Class Utility untuk Artikel
```html
<!-- Badge Kategori -->
<span class="article-card-category">NAMA_KATEGORI</span>

<!-- Card Berita -->
<div class="article-card">
  <img src="path/to/image.jpg" class="article-card-image">
  <div class="article-card-content">
    <span class="article-card-category">Kategori</span>
    <h3>Judul Berita</h3>
    <p>Deskripsi...</p>
    <div class="article-card-meta">Meta info</div>
  </div>
</div>

<!-- Featured Article -->
<div class="featured-article">
  <div class="featured-article-content">
    <span class="featured-category">KATEGORI</span>
    <h2>Judul Berita Utama</h2>
    <div class="featured-article-meta">Meta info</div>
  </div>
</div>
```

### Warna Kategori
Gunakan salah satu dari warna ini untuk badge kategori:
- **Edukasi**: `#FF6B6B` atau `#FF8C42`
- **Ekonomi**: `#FFB703` atau `#FB5607`
- **Hiburan**: `#FB5607` atau `#FF006E`
- **Kriminal**: `#8338EC` atau `#3A86FF`
- **Olahraga**: `#FB5607` atau `#FFBE0B`
- **Politik**: `#8338EC` atau `#06FFA5`
- **Teknologi**: `#3A86FF` atau `#06FFA5`

---

## 💡 Tips dan Trik

### 1. Gambar/Banner
- Gunakan gambar berukuran minimal 800x400px untuk featured article
- Untuk card berita, optimal 400x300px
- Format yang disarankan: JPG atau WebP untuk loading cepat

### 2. Konten
- **Judul**: Max 8-10 kata untuk card, bisa lebih untuk featured
- **Deskripsi**: 50-100 karakter
- **Metadata**: Format "DD Mon YYYY • X menit baca"

### 3. URL Structure
- Gunakan lowercase untuk semua URL
- Gunakan hyphen (-) bukan underscore (_)
- Contoh: `/berita/teknologi/ai-mengubah-industri.html`

### 4. Meta Tags
Jangan lupa tambahkan meta tags untuk SEO:
```html
<meta name="description" content="Deskripsi singkat untuk search engine">
<meta name="keywords" content="kata kunci, relevan, berita">
<meta property="og:title" content="Judul Berita">
<meta property="og:description" content="Deskripsi">
<meta property="og:image" content="URL gambar">
```

### 5. Responsive Design
Website ini sudah responsive untuk:
- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (480px-767px)
- Extra Small (<480px)

### 6. Menambah Menu Kategori
Untuk menambah kategori baru:

1. Buat folder di `/berita/nama-kategori/`
2. Tambahkan file kategori di `/kategori/nama-kategori.html`
3. Update navbar di `index.html`:
   ```html
   <li><a href="/kategori/nama-kategori.html">Nama Kategori</a></li>
   ```
4. Update category tabs dan footer

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1200px) { }

/* Tablet */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
  }
  .articles-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .navbar-menu { display: none; }
}
```

---

## 🔗 Checklist untuk Artikel Baru

- [ ] Buat file HTML di folder yang sesuai
- [ ] Sertakan navbar dan footer
- [ ] Tambahkan meta description
- [ ] Sertakan featured image (800x400px minimum)
- [ ] Gunakan heading structure yang tepat (h1, h2, h3)
- [ ] Format konten dengan paragraf, list, dan heading
- [ ] Tambahkan author info
- [ ] Tambahkan related articles
- [ ] Test responsiveness (buka di mobile)
- [ ] Cek semua link bekerja dengan baik

---

## 🚨 Troubleshooting

### Gambar tidak muncul
- Pastikan path relatif sudah benar
- Contoh: Dari `/berita/kategori/artikel.html` ke `/assets/img/foto.jpg`
  - Gunakan: `../../assets/img/foto.jpg`

### Layout berantakan
- Bersihkan browser cache (Ctrl+Shift+Delete)
- Pastikan CSS di-load dengan benar
- Cek di DevTools (F12) untuk error

### Navbar tidak sticky
- Pastikan CSS sudah ter-load dengan baik
- Cek z-index di DevTools

---

## 📞 Kontak & Support

Untuk pertanyaan atau masalah teknis, hubungi:
- Email: support@portalberta.id
- Kantor: Jl. Berita No. 123, Jakarta

---

**Dibuat dengan ❤️ untuk portal berita Indonesia**
*Terakhir diupdate: 29 April 2026*
