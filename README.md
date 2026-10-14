# Media Dwinovia — Portal HTML

Portal katalog media pembelajaran statis untuk GitHub Pages. Desain responsif, pencarian, filter mata pelajaran/kelas/jenis, media unggulan, dan daftar konten dari satu file konfigurasi.

## Isi paket

- `index.html` — struktur halaman
- `assets/css/styles.css` — tampilan dan responsif
- `assets/js/app.js` — pencarian, filter, dan rendering kartu
- `data/media.js` — **satu-satunya file yang perlu diedit untuk menambah/mengubah daftar media**
- `CNAME.example` — contoh isi domain khusus; bukan file aktif

## Pratinjau lokal

Buka `index.html` di browser. Jika browser membatasi skrip lokal, jalankan server statis lokal atau unggah ke repositori GitHub Pages sementara. Portal tidak membutuhkan backend.

## Menambah media

Edit `data/media.js`, lalu tambahkan objek baru ke array `MEDIA_ITEMS`. Contoh:

```js
{
  id: "simple-past-game",
  title: "Simple Past Game",
  description: "Game latihan Simple Past Tense.",
  url: "https://alamat-media-anda.example/",
  subject: "Bahasa Inggris",
  grades: ["Kelas 8"],
  type: "Game",
  featured: false,
  latest: true,
  theme: "purple",
  symbol: "T",
  status: "active"
}
```

Gunakan `status: "coming-soon"` dan `url: ""` jika media belum siap. Pilihan `theme`: `blue`, `purple`, `mint`, `peach`, `dark`, `sky`.

## Deploy awal di GitHub Pages tanpa mengubah domain utama

1. Buat repositori baru, misalnya `media-dwinovia-portal`.
2. Unggah semua file dan folder dari paket ini ke root repositori.
3. Buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/(root)`, lalu Save.
5. Tunggu hingga GitHub Pages memberikan URL bawaan `https://USERNAME.github.io/media-dwinovia-portal/`.
6. Uji tampilan, pencarian, filter, dan semua tautan media menggunakan URL bawaan tersebut.
7. **Jangan menambahkan domain khusus dan jangan mengubah DNS `media` pada tahap uji ini.** Domain utama `dwinovia.my.id` tidak perlu disentuh.

## Migrasi aman ke `media.dwinovia.my.id`

Lakukan hanya setelah portal siap dan diuji di URL GitHub Pages bawaan.

### Sebelum migrasi
- Simpan semua file portal di repositori GitHub baru.
- Pastikan `https://sites.google.com/view/questiontagchallenge` tetap dapat dibuka.
- Catat/screenshot DNS saat ini.
- Jangan mengubah empat record A untuk host `@` dan CNAME `www`; keduanya menjaga website utama yang ada.
- Siapkan waktu pemeliharaan. Selama perpindahan, domain `media` bisa sementara tidak dapat diakses.

### Urutan migrasi
1. Di Google Sites Question Tag Challenge, buka **Settings → Custom domains**.
2. Hapus hanya pemetaan `media.dwinovia.my.id` dari Google Sites. Ini tidak menghapus situs Google Sites atau URL aslinya.
3. Di repositori portal baru, buka **Settings → Pages → Custom domain**, masukkan `media.dwinovia.my.id`, lalu ikuti instruksi GitHub.
4. Pada DNS DomaiNesia, ubah hanya record host `media` dari:
   - Type: `CNAME`
   - Host: `media`
   - Target: `ghs.googlehosted.com`

   menjadi target CNAME yang ditunjukkan GitHub Pages untuk akun/repo kamu (umumnya `USERNAME.github.io`, tanpa path repo). Gunakan instruksi aktual yang ditampilkan GitHub.
5. Setelah DNS diarahkan, tunggu propagasi. Kembali ke Settings → Pages dan klik **Enforce HTTPS** ketika opsi tersedia.
6. Uji `https://media.dwinovia.my.id` dari browser desktop dan ponsel.

### Yang tidak boleh diubah
- Record A untuk host `@` yang menunjuk ke GitHub Pages website utama.
- CNAME `www` yang mengarah ke `dwinovia114.github.io`.
- File/situs Google Sites aslinya.

## Catatan penting tentang URL

Satu domain `media.dwinovia.my.id` akan menjadi portal utama. Kartu di portal membuka masing-masing media melalui URL asalnya. Portal statis GitHub Pages tidak otomatis mengubah alamat eksternal menjadi path seperti `/questiontag`; setiap media bisa tetap memiliki URL asalnya.

Jika ingin URL bersih seperti `media.dwinovia.my.id/questiontag`, diperlukan konfigurasi routing atau struktur file khusus dan biasanya media HTML perlu dihosting di bawah repositori/domain yang sama. Google Sites dan GAS eksternal tetap lebih sederhana dibuka melalui tautan atau embed jika didukung.

## Privasi dan keamanan

Jangan masukkan data siswa pribadi, password, token, atau kunci API ke file JavaScript publik. Semua file yang dihosting di GitHub Pages bersifat publik.
