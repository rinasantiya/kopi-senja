/* =========================================================
   DATA MENU — 10 varian kopi ala cafe.
   Dipisah ke file sendiri supaya index.html & admin/index.html
   sama-sama bisa pakai data yang sama tanpa duplikasi.
   Foto asli produk ditaruh di folder image/ (ganti file placeholder
   di sana dengan foto sungguhan kalau sudah ada).
   ========================================================= */
const PRODUCTS_DEFAULT = [
  {id:1, name:"Espresso Tunggal", cat:"Espresso", price:18000, oldPrice:null, img:"image/espresso-tunggal.svg", emoji:"☕", desc:"Shot espresso murni dari biji arabika, pekat dan aromatik.", badge:null},
  {id:2, name:"Americano Dingin", cat:"Espresso", price:20000, oldPrice:null, img:"image/americano-dingin.svg", emoji:"🧊", desc:"Espresso dengan air dingin, ringan dan menyegarkan.", badge:null},
  {id:3, name:"Kopi Susu Gula Aren", cat:"Kopi Susu", price:22000, oldPrice:25000, img:"image/kopi-susu-gula-aren.svg", emoji:"🥛", desc:"Perpaduan kopi robusta, susu segar, dan gula aren asli.", badge:"Best Seller"},
  {id:4, name:"Cappuccino Klasik", cat:"Espresso", price:25000, oldPrice:null, img:"image/cappuccino-klasik.svg", emoji:"☕", desc:"Espresso dengan foam susu lembut bertekstur creamy.", badge:null},
  {id:5, name:"Cafe Latte Vanilla", cat:"Espresso", price:26000, oldPrice:null, img:"image/cafe-latte-vanilla.svg", emoji:"🍮", desc:"Latte lembut dengan sentuhan sirup vanilla manis.", badge:null},
  {id:6, name:"V60 Manual Brew Arabika", cat:"Manual Brew", price:28000, oldPrice:null, img:"image/v60-manual-brew.svg", emoji:"⏳", desc:"Diseduh manual dengan V60, rasa fruity dan clean.", badge:"Baru"},
  {id:7, name:"Cold Brew 12 Jam", cat:"Manual Brew", price:24000, oldPrice:null, img:"image/cold-brew.svg", emoji:"🧊", desc:"Diseduh dingin selama 12 jam, rendah asam dan smooth.", badge:null},
  {id:8, name:"Mocha Choco Hazelnut", cat:"Espresso", price:27000, oldPrice:30000, img:"image/mocha-choco-hazelnut.svg", emoji:"🍫", desc:"Espresso, coklat, dan hazelnut dalam satu tegukan manis.", badge:"Promo"},
  {id:9, name:"Es Kopi Kelapa", cat:"Kopi Susu", price:23000, oldPrice:null, img:"image/es-kopi-kelapa.svg", emoji:"🥥", desc:"Kopi susu dipadukan santan kelapa segar, creamy tropis.", badge:null},
  {id:10, name:"Croissant Butter Panggang", cat:"Pastry", price:15000, oldPrice:null, img:"image/croissant.svg", emoji:"🥐", desc:"Croissant renyah berlapis mentega, teman setia ngopi.", badge:"Best Seller"}
];
