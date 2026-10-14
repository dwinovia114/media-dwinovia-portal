/*
 * KONFIGURASI KATALOG MEDIA DWINOVIA
 * Tambahkan atau edit item di dalam array MEDIA_ITEMS.
 *
 * Field:
 * id          : ID unik, huruf kecil dan tanda hubung
 * title       : judul media
 * description : deskripsi singkat
 * url         : alamat lengkap media yang akan dibuka
 * subject     : mata pelajaran (contoh: Bahasa Inggris, Matematika, Umum)
 * grades      : array kelas (contoh: ["Kelas 9"] atau ["Kelas 7","Kelas 8"])
 * type        : "Game", "Materi", "Latihan Interaktif", atau nama jenis lain
 * featured    : true untuk ditampilkan pada bagian unggulan
 * latest      : true untuk memberi penanda media terbaru
 * theme       : blue, purple, mint, peach, dark, sky
 * symbol      : simbol dekoratif di kartu
 * status      : "active" atau "coming-soon"
 *
 * Gunakan URL HTTPS. Item coming-soon tidak dapat dibuka.
 */
const MEDIA_ITEMS = [
  {
    id: "question-tag-challenge",
    title: "Question Tag Challenge",
    description: "Game interaktif untuk berlatih question tags dan menguji pemahaman tata bahasa Inggris.",
    url: "https://sites.google.com/view/questiontagchallenge",
    subject: "Bahasa Inggris",
    grades: ["Kelas 9"],
    type: "Game",
    featured: true,
    latest: false,
    theme: "dark",
    symbol: "Q?",
    status: "active"
  },
  {
    id: "materi-bahasa-inggris-kelas-9",
    title: "Materi Bahasa Inggris Kelas 9",
    description: "Kumpulan ringkasan materi dan sumber belajar Bahasa Inggris untuk kelas 9.",
    url: "",
    subject: "Bahasa Inggris",
    grades: ["Kelas 9"],
    type: "Materi",
    featured: true,
    latest: false,
    theme: "purple",
    symbol: "Aa",
    status: "coming-soon"
  },
  {
    id: "game-pembelajaran-baru",
    title: "Game Pembelajaran Baru",
    description: "Game edukasi berikutnya akan ditambahkan ke koleksi Media Dwinovia.",
    url: "",
    subject: "Umum",
    grades: ["Kelas 7", "Kelas 8", "Kelas 9"],
    type: "Game",
    featured: true,
    latest: true,
    theme: "mint",
    symbol: "✦",
    status: "coming-soon"
  }
];
