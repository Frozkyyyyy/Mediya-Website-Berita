# 🚀 PANDUAN SETUP & CARA MEMBUAT GAMBAR PLACEHOLDER

## 📋 Daftar Isi
1. [Setup Cepat](#setup-cepat)
2. [Membuat Gambar Placeholder](#membuat-gambar-placeholder)
3. [Testing Website](#testing-website)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 Setup Cepat

### Langkah 1: Buka Website
Untuk membuka website dengan live preview:

**Opsi 1: Menggunakan Live Server (Recommended)**
1. Install extension "Live Server" oleh Ritwick Dey di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"
4. Browser akan terbuka otomatis di `http://localhost:5500`

**Opsi 2: Membuka File Langsung**
1. Double-click `index.html`
2. Website akan terbuka di browser default Anda

**Opsi 3: Drag & Drop**
1. Drag file `index.html` ke browser
2. Website akan menampilkan halaman utama

---

## 🖼️ Membuat Gambar Placeholder

### Metode 1: Menggunakan Website Online (Paling Cepat)

**Placeholder.com**
1. Buka https://placeholder.com/
2. Klik di URL bar, ubah menjadi: `https://placeholder.com/800x400?text=Featured+News`
3. Enter dan download gambar
4. Simpan di `assets/img/featured.jpg`

**Contoh URL:**
```
https://placeholder.com/800x400?text=Berita&bg=cc3333&c=fff
https://placeholder.com/400x300?text=Edukasi&bg=FF6B6B&c=fff
https://placeholder.com/400x300?text=Ekonomi&bg=FFB703&c=fff
https://placeholder.com/400x300?text=Hiburan&bg=FF006E&c=fff
https://placeholder.com/400x300?text=Olahraga&bg=FFBE0B&c=fff
https://placeholder.com/400x300?text=Politik&bg=06FFA5&c=fff
https://placeholder.com/400x300?text=Teknologi&bg=3A86FF&c=fff
https://placeholder.com/400x300?text=Kriminal&bg=8338EC&c=fff
```

### Metode 2: Menggunakan Python (Local Machine)

Jika Anda punya Python installed, buat file `create_placeholders.py`:

```python
from PIL import Image, ImageDraw, ImageFont
import os

# Buat folder jika belum ada
os.makedirs('assets/img', exist_ok=True)

# Data untuk gambar
images = {
    'featured.jpg': (800, 400, 'cc3333', 'Berita Utama'),
    'edukasi.jpg': (400, 300, 'FF6B6B', 'Edukasi'),
    'ekonomi.jpg': (400, 300, 'FFB703', 'Ekonomi'),
    'hiburan.jpg': (400, 300, 'FF006E', 'Hiburan'),
    'olahraga.jpg': (400, 300, 'FFBE0B', 'Olahraga'),
    'politik.jpg': (400, 300, '06FFA5', 'Politik'),
    'teknologi.jpg': (400, 300, '3A86FF', 'Teknologi'),
    'kriminal.jpg': (400, 300, '8338EC', 'Kriminal'),
}

# Create images
for filename, (width, height, color, text) in images.items():
    img = Image.new('RGB', (width, height), color=f'#{color}')
    draw = ImageDraw.Draw(img)
    
    # Draw text in center
    text_bbox = draw.textbbox((0, 0), text)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    
    x = (width - text_width) // 2
    y = (height - text_height) // 2
    
    draw.text((x, y), text, fill='white')
    
    img.save(f'assets/img/{filename}')
    print(f'✓ Created {filename}')

print('All placeholder images created successfully!')
```

**Cara menjalankan:**
1. Simpan kode di atas ke file `create_placeholders.py` di root folder
2. Buka terminal/command prompt di folder tersebut
3. Ketik: `python create_placeholders.py`
4. Gambar akan dibuat di `assets/img/`

### Metode 3: Menggunakan AI Image Generator

- **Unsplash**: https://unsplash.com (untuk foto stock berkualitas)
- **Pexels**: https://pexels.com (foto stock gratis)
- **Pixabay**: https://pixabay.com (ilustrasi dan foto)

**Cara:**
1. Kunjungi salah satu website
2. Cari gambar sesuai kategori (berita, teknologi, dll)
3. Download dengan ukuran yang sesuai
4. Simpan di `assets/img/`

### Metode 4: Menggunakan Online Tools

**Canva**
1. Buka https://www.canva.com/
2. Create design dengan ukuran custom 800x400
3. Design sesuai kategori berita
4. Download sebagai JPG
5. Simpan di `assets/img/`

---

## ✅ Testing Website

### 1. Test Responsiveness

**Desktop (1200px+)**
- Buka DevTools (F12)
- Toggle device toolbar off
- Verifikasi layout terlihat normal

**Tablet (768px)**
- DevTools → Toggle device toolbar
- Pilih iPad atau tablet
- Verifikasi: sidebar di bawah, layout menyesuaikan

**Mobile (480px)**
- DevTools → Toggle device toolbar
- Pilih iPhone 12 atau Mobile
- Verifikasi: menu tidak terlihat, search bar penuh

### 2. Test Navigasi

- [ ] Klik logo → kembali ke home
- [ ] Klik setiap menu → membuka kategori yang benar
- [ ] Klik judul berita → membuka artikel
- [ ] Klik kategori di sidebar → membuka kategori

### 3. Test Links

- [ ] Semua internal links bekerja
- [ ] Semua external links (social media) terbuka di tab baru
- [ ] Pagination bekerja
- [ ] Search bar berfungsi

### 4. Test Performance

**Check Loading Speed:**
1. DevTools → Network tab
2. Refresh halaman
3. Perhatikan loading time
4. Optimasi gambar jika terlalu lambat

**Size Images:**
- Gunakan TinyPNG (https://tinypng.com) untuk compress
- Target: <100KB per gambar

---

## 📍 Struktur File Images

Setelah setup, struktur folder `assets/img/` harus seperti:

```
assets/img/
├── featured.jpg         (800x400px) - Featured article
├── edukasi.jpg         (400x300px) - Untuk kategori edukasi
├── ekonomi.jpg         (400x300px) - Untuk kategori ekonomi
├── hiburan.jpg         (400x300px) - Untuk kategori hiburan
├── kriminal.jpg        (400x300px) - Untuk kategori kriminal
├── olahraga.jpg        (400x300px) - Untuk kategori olahraga
├── politik.jpg         (400x300px) - Untuk kategori politik
└── teknologi.jpg       (400x300px) - Untuk kategori teknologi
```

---

## 🐛 Troubleshooting

### Masalah: Gambar tidak muncul

**Solusi:**
1. Pastikan file sudah di folder yang benar (`assets/img/`)
2. Cek nama file (case-sensitive di Linux/Mac)
3. Refresh browser (Ctrl+Shift+R untuk hard refresh)
4. Check DevTools Console (F12) untuk error message

### Masalah: Website terlihat berantakan

**Solusi:**
1. Clear browser cache
2. Pastikan CSS di-load: cek `<link rel="stylesheet">`
3. Gunakan Firefox atau Chrome yang fresh
4. Cek konsol DevTools untuk CSS errors

### Masalah: Warna tidak sesuai

**Solusi:**
1. Verifikasi warna hex pada `style.css`
2. CSS color values: `#cc3333` untuk merah utama
3. Test di website: https://htmlcolorcodes.com/

### Masalah: Font tidak terlihat dengan baik

**Solusi:**
1. Website menggunakan system fonts (tidak perlu import)
2. Jika ingin custom font, tambahkan di `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

3. Update CSS:
```css
body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 🎨 Tips Desain

### Color Palette yang Sesuai
- **Primary (Merah)**: `#cc3333` (sesuai kompas.com)
- **Secondary (Abu)**: `#f0f0f0`
- **Text Dark**: `#333333`
- **Text Light**: `#666666`
- **Border**: `#e0e0e0`

### Ukuran Font
- Heading 1: 28-36px
- Heading 2: 22-28px
- Body text: 14-16px
- Meta info: 12-13px

### Spacing
- Container max-width: 1200px
- Padding: 20px (desktop), 15px (tablet), 10px (mobile)
- Gap between cards: 20-30px

---

## 🚀 Next Steps

1. ✅ Setup gambar placeholder
2. ✅ Test website di berbagai ukuran layar
3. ✅ Verifikasi semua links bekerja
4. ✅ Optimize gambar untuk loading cepat
5. ✅ Deploy ke hosting (optional)

---

## 📞 Support

Jika ada masalah atau pertanyaan, silakan baca kembali dokumentasi di `README.md` atau dokumentasi standar HTML/CSS.

**Happy coding! 🎉**
