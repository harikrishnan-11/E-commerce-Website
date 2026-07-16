/* =========================================================
   STACKLY PRODUCT DATA
   ~90 products across 12 categories and 13 brands, spanning
   electronics, fashion, watches, fitness and kitchen goods.
   Each product has: id, name, category, brand, price, oldPrice,
   discount, rating, reviews, color, stock, icon, image

   IMAGE SOURCE: local files under ./src/products/, NOT a remote CDN.
   ----------------------------------------------------------
   Expected folder layout (one file per product):
     src/products/smart-phones/iphone-15-pro-max-256gb.jpg
     src/products/watches/apple-watch-series-9-45mm.jpg
     src/products/dresses/zara-floral-midi-dress.jpg
     ...etc, one subfolder per category (see CATEGORY_SLUGS below),
     file name = the product name, lowercased and slugified.

   You don't need every file before launch: any product whose photo
   is missing automatically falls back to a clean on-brand SVG tile
   (category color + label) instead of a broken image icon, so the
   grid never looks broken while you're still shooting/collecting photos.
   Swap in real photos any time — same file name, same folder, done.
========================================================= */

const CATEGORY_ICONS = {
    "Smart Phones": "fa-mobile-screen-button",
    "Tablets": "fa-tablet-screen-button",
    "Laptops": "fa-laptop",
    "Headphones": "fa-headphones-simple",
    "TV": "fa-tv",
    "Watches": "fa-clock",
    "Games": "fa-gamepad",
    "Cameras": "fa-camera-retro",
    "Shoes": "fa-shoe-prints",
    "Dresses": "fa-person-dress",
    "Gym": "fa-dumbbell",
    "Kitchen": "fa-kitchen-set"
};

/* Category -> folder name under src/products/ */
const CATEGORY_SLUGS = {
    "Smart Phones": "smart-phones",
    "Tablets": "tablets",
    "Laptops": "laptops",
    "Headphones": "headphones",
    "TV": "tv",
    "Watches": "watches",
    "Games": "games",
    "Cameras": "cameras",
    "Shoes": "shoes",
    "Dresses": "dresses",
    "Gym": "gym",
    "Kitchen": "kitchen"
};

/* Category -> accent color, used only for the SVG fallback tile
   (keeps it on-brand instead of a generic gray broken-image box) */
const CATEGORY_COLORS = {
    "Smart Phones": "#16C60C",
    "Tablets": "#119A09",
    "Laptops": "#2E2E2E",
    "Headphones": "#00A8E8",
    "TV": "#2E2E2E",
    "Watches": "#C9941F",
    "Games": "#8B5CF6",
    "Cameras": "#0077A3",
    "Shoes": "#FF3B30",
    "Dresses": "#D6336C",
    "Gym": "#16C60C",
    "Kitchen": "#E08E00"
};
const PRODUCT_SEEDS = [

    // ================= SMART PHONES =================
    {
        name: "iPhone 15 Pro Max 256GB",
        category: "Smart Phones",
        brand: "Apple",
        price: 1099,
        old: 1299,
        rating: 4.8,
        reviews: 214,
        color: "Black",
        image: "./src/images/Pasted image (22)-compressed.webp"
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        category: "Smart Phones",
        brand: "Samsung",
        price: 1199,
        old: 1349,
        rating: 4.9,
        reviews: 196,
        color: "Titanium Gray",
        image: "./src/images/Pasted image (22)-compressed.webp"
    },
    {
        name: "Google Pixel 9 Pro",
        category: "Smart Phones",
        brand: "Google",
        price: 999,
        old: 1099,
        rating: 4.7,
        reviews: 145,
        color: "White",
        image: "./src/images/Pasted image (22)-compressed.webp"
    },
    {
        name: "OnePlus 12",
        category: "Smart Phones",
        brand: "OnePlus",
        price: 799,
        old: 899,
        rating: 4.6,
        reviews: 163,
        color: "Green",
        image: "./src/images/Pasted image (22)-compressed.webp"
    },
    {
        name: "Xiaomi 14 Ultra",
        category: "Smart Phones",
        brand: "Xiaomi",
        price: 899,
        old: 999,
        rating: 4.5,
        reviews: 118,
        color: "Black",
        image: "./src/images/Pasted image (22)-compressed.webp"
    },

    // ================= LAPTOPS =================
    {
        name: "MacBook Pro M3 14",
        category: "Laptops",
        brand: "Apple",
        price: 1999,
        old: 2199,
        rating: 4.9,
        reviews: 154,
        color: "Space Black",
        image: "./src/images 2/Pasted image (27)-compressed.webp"
    },
    {
        name: "Dell XPS 15",
        category: "Laptops",
        brand: "Dell",
        price: 1799,
        old: 1949,
        rating: 4.8,
        reviews: 93,
        color: "Silver",
        image: "./src/images 2/Pasted image (29)-compressed.webp"
    },
    {
        name: "Dell Alienware m16",
        category: "Laptops",
        brand: "Dell",
        price: 2299,
        old: 2499,
        rating: 4.8,
        reviews: 67,
        color: "Black",
        image: "./src/images 2/Pasted image (30)-compressed.webp"
    },
    {
        name: "ASUS ROG Strix G16",
        category: "Laptops",
        brand: "Asus",
        price: 1699,
        old: 1849,
        rating: 4.7,
        reviews: 88,
        color: "Black",
        image: "./src/images 2/Pasted image (31)-compressed.webp"
    },
    {
        name: "Lenovo Legion 5 Pro",
        category: "Laptops",
        brand: "Lenovo",
        price: 1499,
        old: 1699,
        rating: 4.7,
        reviews: 111,
        color: "Gray",
        image: "./src/images 2/Pasted image (32)-compressed.webp"
    },

    // ================= HEADPHONES =================
    {
        name: "Sony WH-1000XM5",
        category: "Headphones",
        brand: "Sony",
        price: 349,
        old: 399,
        rating: 4.9,
        reviews: 315,
        color: "Black",
        image: "./src/images 2/Pasted image (3)-compressed.webp"
    },
    {
        name: "Headphone Pro 2",
        category: "Headphones",
        brand: "Apple",
        price: 249,
        old: 279,
        rating: 4.8,
        reviews: 428,
        color: "White",
        image: "./src/images 2/Pasted image (7)-compressed.webp"
    },
    {
        name: "Samsung Galaxy Buds 3 Pro",
        category: "Headphones",
        brand: "Samsung",
        price: 199,
        old: 229,
        rating: 4.6,
        reviews: 182,
        color: "Silver",
        image: "./src/images 2/Pasted image (7)-compressed.webp"
    },
    {
        name: "JBL Tune 770NC",
        category: "Headphones",
        brand: "JBL",
        price: 149,
        old: 179,
        rating: 4.5,
        reviews: 144,
        color: "Blue",
        image: "./src/images 2/Pasted image (7)-compressed.webp"
    },

    // ================= WATCHES =================
    {
        name: "Apple Watch Series 10",
        category: "Watches",
        brand: "Apple",
        price: 499,
        old: 549,
        rating: 4.9,
        reviews: 248,
        color: "Black",
        image: "./src/images/Untitled design (9)-compressed.webp"
    },
    {
        name: "Samsung Galaxy Watch Ultra",
        category: "Watches",
        brand: "Samsung",
        price: 599,
        old: 649,
        rating: 4.8,
        reviews: 173,
        color: "Gray",
        image: "./src/images/Untitled design (9)-compressed.webp"
    },
    {
        name: "Garmin Fenix 8",
        category: "Watches",
        brand: "Garmin",
        price: 799,
        old: 899,
        rating: 4.9,
        reviews: 94,
        color: "Black",
        image: "./src/images/Untitled design (9)-compressed.webp"
    },
    {
        name: "Rolex Oyster Perpetual",
        category: "Watches",
        brand: "Rolex",
        price: 6800,
        old: null,
        rating: 5.0,
        reviews: 31,
        color: "Silver",
        image: "./src/images/Untitled design (9)-compressed.webp"
    },

    // ================= CAMERAS =================
    {
        name: "Sony Alpha A7 IV",
        category: "Cameras",
        brand: "Sony",
        price: 2499,
        old: 2699,
        rating: 4.9,
        reviews: 84,
        color: "Black",
        image: "./src/images/Untitled design (16)-compressed.webp"
    },
    {
        name: "Canon EOS R6 Mark II",
        category: "Cameras",
        brand: "Canon",
        price: 2399,
        old: 2599,
        rating: 4.8,
        reviews: 71,
        color: "Black",
        image: "./src/images/Untitled design (16)-compressed.webp"
    },
    {
        name: "Nikon Z8",
        category: "Cameras",
        brand: "Nikon",
        price: 3999,
        old: 4299,
        rating: 4.9,
        reviews: 48,
        color: "Black",
        image: "./src/images/Untitled design (16)-compressed.webp"
    },

    // ================= SHOES =================
    {
        name: "Nike Air Max 270",
        category: "Shoes",
        brand: "Nike",
        price: 159,
        old: 189,
        rating: 4.7,
        reviews: 318,
        color: "White",
        image: "./src/images/Untitled design (8)-compressed.webp"
    },
    {
        name: "Adidas Ultraboost 5",
        category: "Shoes",
        brand: "Adidas",
        price: 179,
        old: 209,
        rating: 4.8,
        reviews: 236,
        color: "Black",
        image: "./src/images/Untitled design (8)-compressed.webp"
    },
    {
        name: "Puma RS-X",
        category: "Shoes",
        brand: "Puma",
        price: 129,
        old: 149,
        rating: 4.5,
        reviews: 147,
        color: "Blue",
        image: "./src/images/Untitled design (8)-compressed.webp"
    },

    // ================= KITCHEN =================
    {
        name: "KitchenAid Stand Mixer",
        category: "Kitchen",
        brand: "KitchenAid",
        price: 399,
        old: 449,
        rating: 4.9,
        reviews: 219,
        color: "Red",
        image: "./src/images/Untitled design (18)-compressed.webp"
    }
];

const PRODUCTS = PRODUCT_SEEDS.map((p, i) => {
    const discount = p.old
        ? Math.round(((p.old - p.price) / p.old) * 100)
        : 0;

    return {
        id: i + 1,
        name: p.name,
        category: p.category,
        brand: p.brand,
        price: p.price,
        oldPrice: p.old,
        discount,
        rating: p.rating,
        reviews: p.reviews,
        color: p.color,
        stock: p.reviews % 7 !== 0,
        icon: CATEGORY_ICONS[p.category],
        image: p.image
    };
});