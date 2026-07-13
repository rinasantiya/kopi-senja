# ☕ Kopi Senja — Website E-Commerce Cafe & Manual Brew Online

Website pemesanan kopi online untuk cafe **Kopi Senja**, lengkap dengan halaman customer (katalog, keranjang, checkout, simulasi pembayaran) dan panel admin (dashboard, manajemen menu, manajemen pesanan).

---

## 📋 IDENTITAS MAHASISWA

| Keterangan | Detail |
|---|---|
| **Nama** | (isi nama kamu) |
| **NIM** | (isi NIM kamu) |
| **Mata Kuliah** | (isi mata kuliah) |
| **Program Studi** | (isi program studi) |
| **Semester** | (isi semester) |

---

## 🔗 LINK AKSES UTAMA

| Keterangan | Link |
|---|---|
| **Live Website (Customer)** | (isi link GitHub Pages setelah deploy, mis. `https://username.github.io/fruitybite/`) |
| **Halaman Admin** | (isi link admin dashboard setelah tersedia) |
| **Repository GitHub** | (isi link repo) |

---

## 📖 DAFTAR ISI

1. [Identitas Mahasiswa](#-identitas-mahasiswa)
2. [Link Akses Utama](#-link-akses-utama)
3. [Deskripsi Proyek](#-deskripsi-proyek)
4. [Fitur Utama](#-fitur-utama)
   - [Halaman Customer](#a-halaman-customer-kopi-senjahtml)
   - [Halaman Admin](#b-halaman-admin-admin-2html)
5. [Struktur Menu / Produk](#-struktur-menu--produk)
6. [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
7. [Struktur File Proyek](#-struktur-file-proyek)
8. [Cara Menjalankan Proyek](#-cara-menjalankan-proyek)
9. [Kredensial Login Admin](#-kredensial-login-admin)
10. [Alur Penggunaan Aplikasi](#-alur-penggunaan-aplikasi)
11. [Sinkronisasi Data Customer ↔ Admin](#-sinkronisasi-data-customer--admin)
12. [Skema Penyimpanan Data (localStorage)](#-skema-penyimpanan-data-localstorage)
13. [Tampilan Responsif](#-tampilan-responsif)
14. [Catatan & Batasan](#-catatan--batasan)
15. [Rencana Pengembangan Selanjutnya](#-rencana-pengembangan-selanjutnya)
16. [Lisensi](#-lisensi)

---

## 📝 DESKRIPSI PROYEK

**Kopi Senja** adalah sebuah aplikasi web tugas kuliah yang mensimulasikan sistem pemesanan kopi secara online layaknya cafe modern. Proyek ini terdiri dari dua bagian utama:

1. **Halaman Customer (`kopi-senja.html`)** — etalase toko tempat pelanggan dapat melihat menu, mencari & memfilter produk, menambahkan ke keranjang, melakukan checkout, dan menerima simulasi pembayaran.
2. **Halaman Admin (`admin-2-1.html`)** — dashboard pengelolaan yang memungkinkan admin memantau statistik penjualan, mengelola daftar menu (tambah/edit/hapus produk), serta memantau dan mengubah status pesanan yang masuk.

Seluruh data (produk & pesanan) disimpan menggunakan **`localStorage`** milik browser, sehingga aplikasi ini **tidak memerlukan server backend maupun database** — cocok untuk keperluan demo maupun tugas kuliah yang membutuhkan pengujian end-to-end tanpa proses instalasi rumit.

---

## ✨ FITUR UTAMA

### A. Halaman Customer (`kopi-senja.html`)

- **Hero Section** — tampilan awal dengan branding, statistik toko, dan tombol ajakan (CTA) untuk melihat menu.
- **Navigasi Responsif** — navbar sticky dengan menu hamburger di layar kecil.
- **Katalog Produk Interaktif**
  - Pencarian produk (search bar) secara real-time.
  - Filter kategori menggunakan chip filter (mis. Espresso, Kopi Susu, dll).
  - Dropdown pengurutan (sort) produk.
  - Tampilan grid produk yang muncul dengan animasi *fade-in* saat discroll (Intersection Observer).
- **Detail Produk (Modal)** — menampilkan gambar, deskripsi, harga, dan kontrol jumlah (quantity) sebelum ditambahkan ke keranjang.
- **Keranjang Belanja (Cart Drawer)**
  - Slide-in drawer dari sisi kanan layar.
  - Update jumlah barang, hapus barang, dan kalkulasi total otomatis.
  - Badge jumlah item di ikon keranjang navbar.
- **Checkout & Simulasi Pembayaran**
  - Form data pengantaran lengkap dengan validasi input (nama, no. HP, email, alamat, kota, kode pos).
  - Pilihan metode pembayaran: Transfer Bank (simulasi Midtrans), E-Wallet/QRIS (simulasi Xendit), dan COD.
  - Ringkasan pesanan otomatis (subtotal, ongkos kirim, total).
  - Modal sukses pembayaran dengan nomor pesanan unik.
- **Ulasan Pembeli** — menampilkan testimoni pelanggan dengan rating bintang.
- **Toast Notification** — notifikasi ringan (misalnya saat produk ditambahkan ke keranjang).
- **Integrasi Google Analytics (dummy)** — event tracking untuk `begin_checkout` dan `purchase`.
- **Tombol Akses Admin** — tombol khusus di navbar untuk membuka panel admin sebagai overlay di halaman yang sama.

### B. Halaman Admin (`admin-2.html`)

- **Login Gate** — halaman kode akses sederhana sebelum masuk dashboard (lihat bagian [Kredensial Login Admin](#-kredensial-login-admin)).
- **Dashboard Statistik**
  - Ringkasan total pesanan, total pendapatan, jumlah produk, dan data ringkas lain.
  - Data diperbarui otomatis (live) berdasarkan perubahan di `localStorage`.
- **Manajemen Menu (CRUD Produk)**
  - Tambah produk baru lengkap dengan nama, kategori, harga, harga diskon, deskripsi, badge, dan gambar (upload/base64).
  - Edit data produk yang sudah ada.
  - Hapus produk dengan konfirmasi modal.
  - Reset seluruh data produk kembali ke data default.
- **Manajemen Pesanan**
  - Melihat daftar pesanan customer secara real-time.
  - Mengubah status pesanan (misalnya dari "Diproses" ke status lain).
  - Export data pesanan ke file JSON.
  - Import data pesanan dari file JSON (sebagai jalur cadangan bila `localStorage` bermasalah, misalnya di mode private/incognito).
- **Sinkronisasi Antar Tab** — panel admin otomatis me-refresh data ketika ada perubahan dari tab storefront (customer), menggunakan kombinasi:
  - Event `storage` bawaan browser.
  - `BroadcastChannel` untuk sinkronisasi instan antar tab (satu origin/server yang sama).
  - Polling otomatis setiap beberapa detik sebagai fallback.
- **Toast Notification** — notifikasi aksi admin (tambah/edit/hapus produk, dsb).

---

## 🍹 STRUKTUR MENU / PRODUK

Contoh data menu default yang tersedia di aplikasi (dapat diubah melalui panel admin):

| No | Nama Menu | Kategori | Harga | Keterangan |
|----|-----------|----------|-------|------------|
| 1 | Espresso Tunggal | Espresso | Rp18.000 | Shot espresso murni dari biji arabika |
| 2 | Americano Dingin | Espresso | Rp20.000 | Espresso + air dingin |
| 3 | Kopi Susu Gula Aren | Kopi Susu | Rp22.000 (dari Rp25.000) | Best Seller |
| 4 | Cappuccino Klasik | Espresso | Rp25.000 | Espresso, susu, foam klasik |
| ... | *dan menu lainnya* | | | Total 10 varian menu kopi ala cafe |

> Semua data produk tertanam langsung di dalam kode (hardcoded default) sehingga aplikasi tetap berfungsi walau tanpa koneksi ke server atau file eksternal, dan dapat diubah kapan saja lewat panel admin.

---

## 🛠️ TEKNOLOGI YANG DIGUNAKAN

| Teknologi | Kegunaan |
|---|---|
| **HTML5** | Struktur dasar halaman |
| **CSS3 (Custom Properties/Variables)** | Styling, tema warna (espresso, latte, rose, gold, moss), animasi, dan layout responsif |
| **JavaScript (Vanilla JS)** | Seluruh logika aplikasi: keranjang, filter, validasi form, CRUD produk, dsb — tanpa framework |
| **Google Fonts** | Font `Fraunces` (heading) dan `Work Sans` (body text) |
| **localStorage Web API** | Penyimpanan data produk & pesanan di sisi client |
| **BroadcastChannel API** | Sinkronisasi data real-time antar tab browser |
| **Intersection Observer API** | Animasi fade-in saat produk masuk ke area layar |
| **Google Analytics (gtag.js)** | Pelacakan event checkout & pembelian (dummy/simulasi) |

---

## 📁 STRUKTUR FILE PROYEK

```
kopi-senja/
│
├── kopi-senja.html      # Halaman utama customer (etalase, cart, checkout)
├── admin-2.html         # Halaman panel admin (dashboard, CRUD produk, pesanan)
└── README.md            # Dokumentasi proyek (file ini)
```

> **Catatan:** Halaman admin juga dapat diakses langsung sebagai overlay dari dalam `kopi-senja.html` melalui tombol admin di navbar, tanpa perlu membuka file terpisah.

---

## ▶️ CARA MENJALANKAN PROYEK

### Opsi 1 — Menjalankan secara lokal
1. Unduh/clone seluruh isi repository.
2. Buka file `kopi-senja.html` menggunakan browser modern (Chrome, Firefox, Edge, dsb).
3. Untuk membuka panel admin, gunakan tombol **Admin** di navbar, atau buka langsung file `admin-2.html`.
4. Disarankan menjalankan melalui *local server* (misalnya Live Server di VS Code) agar sinkronisasi antar tab (`BroadcastChannel`) bekerja optimal, karena beberapa browser membatasi fitur ini pada protokol `file://`.

### Opsi 2 — Mengakses via GitHub Pages
1. Buka link **Live Website (Customer)** pada bagian [Link Akses Utama](#-link-akses-utama) di atas.
2. Jelajahi menu, tambahkan ke keranjang, dan coba proses checkout.
3. Untuk mengakses admin, gunakan tombol Admin di navbar atau link **Halaman Admin** pada bagian yang sama.

---

## 🔐 KREDENSIAL LOGIN ADMIN

| Field | Nilai |
|---|---|
| **Kode Akses** | `admin123` |

> Kode akses ini **hanya untuk keperluan demo/tugas kuliah** dan ditampilkan langsung di halaman login sebagai petunjuk. Tidak disarankan untuk digunakan pada aplikasi produksi/nyata.

---

## 🔄 ALUR PENGGUNAAN APLIKASI

1. **Customer membuka halaman utama** → melihat hero section, lalu scroll ke bagian menu.
2. **Mencari/memfilter produk** menggunakan search bar, chip kategori, atau dropdown sortir.
3. **Melihat detail produk** dengan klik tombol "Detail" pada kartu produk (modal terbuka).
4. **Menambahkan produk ke keranjang** dengan tombol "+ Keranjang".
5. **Membuka keranjang** melalui ikon cart di navbar → cek isi pesanan, ubah jumlah, atau hapus barang.
6. **Melanjutkan ke Checkout** → mengisi data pengantaran & memilih metode pembayaran.
7. **Klik "Bayar Sekarang"** → validasi form dijalankan, jika valid maka sistem membuat nomor pesanan unik dan menyimpannya ke `localStorage`.
8. **Modal sukses pembayaran muncul**, lalu customer dapat kembali ke beranda.
9. **Admin membuka panel admin**, memasukkan kode akses, lalu dapat:
   - Melihat statistik penjualan terbaru di dashboard.
   - Melihat/memperbarui status pesanan yang baru masuk.
   - Menambah, mengedit, atau menghapus menu produk.

---

## 🔗 SINKRONISASI DATA CUSTOMER ↔ ADMIN

Karena aplikasi ini tidak memiliki backend/database, data dipertukarkan antara halaman customer dan admin melalui mekanisme berikut:

1. **`localStorage`** sebagai penyimpanan utama (key: `kopisenja_orders` dan `kopisenja_products`).
2. **`BroadcastChannel("kopisenja_sync")`** — begitu ada pesanan baru atau perubahan produk di satu tab, tab lain (misalnya panel admin) akan menerima notifikasi dan langsung me-refresh data tanpa perlu reload manual (selama dibuka pada origin/server lokal yang sama, mis. `http://localhost/...`).
3. **Event `storage`** — fallback bawaan browser jika `BroadcastChannel` tidak didukung.
4. **Polling setiap 3 detik** — pengecekan otomatis di sisi admin sebagai jaring pengaman terakhir apabila kedua metode di atas tidak berjalan (misalnya saat dibuka dari dua dokumen `file://` yang berbeda).
5. **Refresh saat tab kembali fokus** — data akan diperbarui otomatis saat pengguna berpindah kembali ke tab admin yang sudah login.

---

## 💾 SKEMA PENYIMPANAN DATA (localStorage)

| Key | Isi | Format |
|---|---|---|
| `kopisenja_products` | Daftar seluruh produk/menu (id, nama, kategori, harga, harga lama, gambar, deskripsi, badge) | Array of Object (JSON) |
| `kopisenja_orders` | Daftar seluruh pesanan customer (id pesanan, data pengantaran, metode bayar, item, subtotal, ongkir, total, status, tanggal) | Array of Object (JSON) |
| `kopisenja_admin_auth` (sessionStorage) | Status autentikasi admin dalam satu sesi tab | `"1"` jika sudah login |

> Data akan hilang apabila cache/`localStorage` browser dibersihkan, atau apabila dibuka dalam mode private/incognito (yang tidak menyimpan data secara persisten).

---

## 📱 TAMPILAN RESPONSIF

Website ini dirancang responsif dengan breakpoint utama:

| Lebar Layar | Penyesuaian |
|---|---|
| `≤ 980px` | Grid produk berubah menjadi 3 kolom, layout hero & checkout menjadi 1 kolom |
| `≤ 720px` | Navigasi berubah menjadi menu hamburger, grid produk 2 kolom, form checkout 1 kolom |
| `≤ 480px` | Grid produk & footer menyesuaikan menjadi 1–2 kolom untuk layar mobile kecil |

Aplikasi juga mendukung preferensi pengguna `prefers-reduced-motion` untuk menonaktifkan animasi bagi pengguna yang sensitif terhadap gerakan.

---

## ⚠️ CATATAN & BATASAN

- Proyek ini dibuat **khusus untuk keperluan tugas kuliah/demo**, bukan aplikasi e-commerce produksi yang sesungguhnya.
- **Tidak ada transaksi pembayaran nyata** — seluruh proses checkout hanya simulasi (ditandai jelas pada halaman checkout).
- **Tidak menggunakan database maupun backend server** — seluruh data tersimpan di `localStorage` browser pengguna masing-masing, sehingga data tidak dapat diakses/dibagikan antar perangkat berbeda.
- Kode akses admin bersifat statis dan diketahui publik (untuk kemudahan demo), sehingga **tidak aman untuk digunakan di lingkungan produksi**.
- ID Google Analytics (`GA_MEASUREMENT_ID`) masih berupa placeholder/dummy dan perlu diganti dengan ID asli apabila ingin benar-benar melacak data pengunjung.

---

## 🚀 RENCANA PENGEMBANGAN SELANJUTNYA

- Integrasi backend & database sungguhan (misalnya Node.js + MongoDB/MySQL) agar data tersimpan secara terpusat.
- Implementasi gateway pembayaran nyata (Midtrans/Xendit) untuk transaksi sungguhan.
- Sistem otentikasi admin yang lebih aman (hashing password, token, dsb).
- Fitur riwayat pesanan untuk pelanggan (histori transaksi per user).
- Fitur multi-admin dengan hak akses berjenjang (role-based access).

---

## 📄 LISENSI

Proyek ini dibuat untuk keperluan tugas kuliah. Seluruh hak cipta konten (nama, logo, teks) bersifat fiktif dan hanya digunakan untuk simulasi/edukasi.

© 2026 Kopi Senja. Dibuat untuk keperluan tugas kuliah.
