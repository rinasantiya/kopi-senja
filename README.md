# Kopi Senja — Website E-Commerce Kopi (Multi-Page)

Struktur website toko kopi online, dipecah jadi banyak file/folder biar rapi kayak project beneran (dan gampang di-push ke GitHub).

## Struktur Folder

```
kopi-senja-web2/
├── admin/
│   └── index.html        → panel admin (login, kelola produk & pesanan)
├── css/
│   └── style.css         → semua styling situs (dipakai semua halaman)
├── js/
│   ├── products.js        → data 10 menu kopi (dipakai bareng semua halaman)
│   └── cart.js            → logika keranjang, pesanan, localStorage
├── image/
│   └── README.md          → taruh foto produk asli di sini
├── index.html             → halaman utama / katalog menu
├── checkout.html          → halaman checkout (form + pembayaran)
├── order-sukses.html      → halaman konfirmasi setelah checkout berhasil
├── lacak-pesanan.html     → halaman lacak status pesanan
└── README.md
```

## Cara Menjalankan

1. Buka folder ini di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.
4. Belanja → Checkout → otomatis diarahkan ke halaman sukses → bisa lacak pesanan di `lacak-pesanan.html`.
5. Buka `admin/index.html` untuk kelola produk & pesanan (password demo: `senja123`).

## Alur Data

Semua halaman berbagi data lewat `localStorage` milik browser (bukan file), dengan key:
- `kopisenja_products` — daftar menu
- `kopisenja_cart` — isi keranjang belanja
- `kopisenja_orders` — riwayat pesanan

> Karena `localStorage` itu per-**origin** (bukan per-folder), halaman-halaman ini tetap sinkron walau ada di folder berbeda (`admin/`), asal dibuka lewat server yang sama (mis. Live Server di `http://127.0.0.1:5500`). Jangan buka file dengan cara klik dua kali (`file://`) karena beberapa browser membatasi localStorage di mode itu.

## Fitur

- **index.html** — katalog produk dengan filter kategori, keranjang belanja (drawer).
- **checkout.html** — form data pengantaran + pilihan metode pembayaran (Transfer/E-Wallet/COD), validasi input.
- **order-sukses.html** — ringkasan pesanan setelah checkout berhasil, lengkap nomor pesanan.
- **lacak-pesanan.html** — cari pesanan berdasarkan nomor pesanan atau nomor HP, lihat status pengantaran.
- **admin/index.html** — login gate, dashboard statistik + simulasi metrik Google Analytics, kelola produk & update status pesanan.

## Setup Google Analytics (opsional)

Tambahkan script `gtag.js` di `<head>` `index.html` seperti berikut, ganti `GA_MEASUREMENT_ID` dengan ID asli:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Catatan Teknis

- Tidak butuh build tool / `npm install` — HTML, CSS, JS biasa.
- Tidak ada backend — semua data tersimpan lokal di browser (cocok untuk demo/tugas kuliah, bukan produksi).
- Kalau mau ganti placeholder emoji jadi foto asli, baca `image/README.md`.
