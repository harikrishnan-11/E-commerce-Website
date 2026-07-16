/* =========================================================
   STACKLY PRODUCT DATA
   50 products generated from realistic brand/category/model
   combinations. Each product has: id, name, category, brand,
   price, oldPrice, discount, rating, reviews, color, stock, icon
========================================================= */

const CATEGORY_ICONS = {
    "Cell Phones": "fa-mobile-screen-button",
    "Tablets": "fa-tablet-screen-button",
    "Laptops": "fa-laptop",
    "Headphones": "fa-headphones-simple",
    "Television": "fa-tv",
    "Smart Watch": "fa-stopwatch",
    "Gaming": "fa-gamepad",
    "Cameras": "fa-camera-retro"
};

const PRODUCT_SEEDS = [
    // Cell Phones
    { name: "iPhone 15 Pro Max 256GB", category: "Cell Phones", brand: "Apple", price: 1099, old: 1299, rating: 4.8, reviews: 214, color: "black" },
    { name: "iPhone 15 128GB", category: "Cell Phones", brand: "Apple", price: 699, old: 799, rating: 4.6, reviews: 178, color: "blue" },
    { name: "Galaxy S24 Ultra 512GB", category: "Cell Phones", brand: "Samsung", price: 1189, old: 1399, rating: 4.7, reviews: 302, color: "black" },
    { name: "Galaxy A54 5G 128GB", category: "Cell Phones", brand: "Samsung", price: 349, old: 429, rating: 4.3, reviews: 96, color: "green" },
    { name: "Redmi Note 12 Pro+ 5G", category: "Cell Phones", brand: "Xiaomi", price: 329, old: 399, rating: 4.4, reviews: 145, color: "blue" },
    { name: "Xiaomi 13T Pro 256GB", category: "Cell Phones", brand: "Xiaomi", price: 649, old: null, rating: 4.5, reviews: 88, color: "black" },
    { name: "Xperia 1 V 5G", category: "Cell Phones", brand: "Sony", price: 999, old: 1199, rating: 4.2, reviews: 41, color: "black" },
    { name: "Xperia 10 V", category: "Cell Phones", brand: "Sony", price: 399, old: null, rating: 4.0, reviews: 27, color: "yellow" },

    // Tablets
    { name: "iPad Pro 12.9\" M2 256GB", category: "Tablets", brand: "Apple", price: 1099, old: 1249, rating: 4.9, reviews: 167, color: "black" },
    { name: "iPad Air 5th Gen 64GB", category: "Tablets", brand: "Apple", price: 549, old: 599, rating: 4.6, reviews: 132, color: "blue" },
    { name: "Galaxy Tab S9 Ultra", category: "Tablets", brand: "Samsung", price: 999, old: 1199, rating: 4.7, reviews: 76, color: "black" },
    { name: "Galaxy Tab A9+", category: "Tablets", brand: "Samsung", price: 219, old: 259, rating: 4.1, reviews: 54, color: "green" },
    { name: "Xiaomi Pad 6", category: "Tablets", brand: "Xiaomi", price: 349, old: 399, rating: 4.3, reviews: 61, color: "black" },

    // Laptops
    { name: "MacBook Pro 14\" M3 512GB", category: "Laptops", brand: "Apple", price: 1799, old: 1999, rating: 4.9, reviews: 245, color: "black" },
    { name: "MacBook Air 13\" M2 256GB", category: "Laptops", brand: "Apple", price: 999, old: 1099, rating: 4.8, reviews: 310, color: "black" },
    { name: "Galaxy Book4 Pro 16\"", category: "Laptops", brand: "Samsung", price: 1449, old: 1699, rating: 4.4, reviews: 58, color: "black" },
    { name: "Dell XPS 13 Plus", category: "Laptops", brand: "Dell", price: 1199, old: 1399, rating: 4.6, reviews: 129, color: "black" },
    { name: "Dell Inspiron 15 3000", category: "Laptops", brand: "Dell", price: 549, old: 649, rating: 4.0, reviews: 87, color: "black" },
    { name: "Dell Alienware m16 Gaming", category: "Laptops", brand: "Dell", price: 2199, old: 2499, rating: 4.7, reviews: 44, color: "black" },
    { name: "Sony VAIO SX14", category: "Laptops", brand: "Sony", price: 1349, old: 1549, rating: 4.1, reviews: 12, color: "black" },

    // Headphones
    { name: "AirPods Pro 2nd Gen", category: "Headphones", brand: "Apple", price: 229, old: 249, rating: 4.7, reviews: 512, color: "black" },
    { name: "AirPods Max", category: "Headphones", brand: "Apple", price: 479, old: 549, rating: 4.5, reviews: 176, color: "green" },
    { name: "Galaxy Buds2 Pro", category: "Headphones", brand: "Samsung", price: 179, old: 229, rating: 4.4, reviews: 203, color: "black" },
    { name: "WH-1000XM5 Wireless", category: "Headphones", brand: "Sony", price: 349, old: 399, rating: 4.9, reviews: 421, color: "black" },
    { name: "WF-1000XM5 Earbuds", category: "Headphones", brand: "Sony", price: 279, old: 299, rating: 4.6, reviews: 165, color: "black" },
    { name: "Sony Extra Bass XB700", category: "Headphones", brand: "Sony", price: 89, old: 119, rating: 4.0, reviews: 78, color: "blue" },
    { name: "Xiaomi Redmi Buds 4", category: "Headphones", brand: "Xiaomi", price: 39, old: 59, rating: 4.1, reviews: 92, color: "yellow" },

    // Television
    { name: "Samsung 65\" Neo QLED 4K", category: "Television", brand: "Samsung", price: 1799, old: 2199, rating: 4.7, reviews: 88, color: "black" },
    { name: "Samsung 55\" Crystal UHD", category: "Television", brand: "Samsung", price: 649, old: 799, rating: 4.4, reviews: 156, color: "black" },
    { name: "Sony Bravia XR 55\" OLED", category: "Television", brand: "Sony", price: 1599, old: 1899, rating: 4.8, reviews: 63, color: "black" },
    { name: "Sony Bravia 43\" LED Smart TV", category: "Television", brand: "Sony", price: 449, old: 529, rating: 4.2, reviews: 71, color: "black" },
    { name: "Xiaomi TV Q2 55\"", category: "Television", brand: "Xiaomi", price: 549, old: 649, rating: 4.3, reviews: 47, color: "black" },

    // Smart Watch
    { name: "Apple Watch Series 9 45mm", category: "Smart Watch", brand: "Apple", price: 429, old: 479, rating: 4.7, reviews: 289, color: "black" },
    { name: "Apple Watch Ultra 2", category: "Smart Watch", brand: "Apple", price: 799, old: 849, rating: 4.8, reviews: 134, color: "yellow" },
    { name: "Galaxy Watch6 Classic", category: "Smart Watch", brand: "Samsung", price: 399, old: 449, rating: 4.5, reviews: 118, color: "black" },
    { name: "Galaxy Watch FE", category: "Smart Watch", brand: "Samsung", price: 199, old: 249, rating: 4.2, reviews: 65, color: "green" },
    { name: "Xiaomi Watch S3", category: "Smart Watch", brand: "Xiaomi", price: 129, old: 159, rating: 4.1, reviews: 54, color: "black" },
    { name: "Sony Wena 3 Hybrid", category: "Smart Watch", brand: "Sony", price: 249, old: null, rating: 3.9, reviews: 19, color: "blue" },

    // Gaming
    { name: "Dell G15 Gaming Desktop", category: "Gaming", brand: "Dell", price: 1299, old: 1499, rating: 4.4, reviews: 39, color: "black" },
    { name: "Dell Alienware Aurora R16", category: "Gaming", brand: "Dell", price: 2399, old: 2799, rating: 4.6, reviews: 22, color: "black" },
    { name: "Samsung Odyssey G9 Monitor", category: "Gaming", brand: "Samsung", price: 1399, old: 1599, rating: 4.7, reviews: 58, color: "black" },
    { name: "Samsung Odyssey G5 27\"", category: "Gaming", brand: "Samsung", price: 279, old: 329, rating: 4.3, reviews: 91, color: "black" },
    { name: "Sony PS5 DualSense Controller", category: "Gaming", brand: "Sony", price: 69, old: 79, rating: 4.6, reviews: 344, color: "red" },
    { name: "Sony PlayStation 5 Console", category: "Gaming", brand: "Sony", price: 499, old: null, rating: 4.9, reviews: 601, color: "black" },
    { name: "Xiaomi Mi Gaming Mouse", category: "Gaming", brand: "Xiaomi", price: 29, old: 39, rating: 4.0, reviews: 47, color: "black" },

    // Cameras
    { name: "Sony Alpha A7 IV Mirrorless", category: "Cameras", brand: "Sony", price: 2199, old: 2499, rating: 4.8, reviews: 76, color: "black" },
    { name: "Sony ZV-1F Vlogging Camera", category: "Cameras", brand: "Sony", price: 499, old: 549, rating: 4.4, reviews: 62, color: "black" },
    { name: "Samsung 360 Round Camera", category: "Cameras", brand: "Samsung", price: 3499, old: null, rating: 4.1, reviews: 8, color: "black" },
    { name: "Xiaomi Mi Action Cam 4K", category: "Cameras", brand: "Xiaomi", price: 89, old: 119, rating: 4.0, reviews: 53, color: "yellow" },
    { name: "Dell UltraSharp Webcam", category: "Cameras", brand: "Dell", price: 199, old: 229, rating: 4.3, reviews: 31, color: "black" }
];

const PRODUCTS = PRODUCT_SEEDS.map((p, i) => {
    const discount = p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0;
    return {
        id: i + 1,
        name: p.name,
        category: p.category,
        brand: p.brand,
        price: p.price,
        oldPrice: p.old,
        discount: discount,
        rating: p.rating,
        reviews: p.reviews,
        color: p.color,
        stock: p.reviews % 7 === 0 ? false : true,
        icon: CATEGORY_ICONS[p.category]
    };
});