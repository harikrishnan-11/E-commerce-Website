/* =========================================================
   STACKLY PRODUCTS PAGE
   Filtering, sorting, pagination, mobile filter drawer
========================================================= */

(function () {
    const grid = document.getElementById("productsGrid");
    const noResults = document.getElementById("noResults");
    const resultsCount = document.getElementById("resultsCount");
    const pagination = document.getElementById("pagination");
    const activeChips = document.getElementById("activeChips");

    const categoryFilters = document.getElementById("categoryFilters");
    const brandFilters = document.getElementById("brandFilters");
    const colorFilters = document.getElementById("colorFilters");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const ratingFilter = document.getElementById("ratingFilter");
    const inStockOnly = document.getElementById("inStockOnly");
    const sortSelect = document.getElementById("sortSelect");
    const perPageSelect = document.getElementById("perPageSelect");
    const searchInput = document.getElementById("productSearch");
    const clearFiltersBtn = document.getElementById("clearFilters");

    const filterToggle = document.getElementById("filterToggle");
    const closeFilters = document.getElementById("closeFilters");
    const applyFiltersMobile = document.getElementById("applyFiltersMobile");
    const filterOverlay = document.getElementById("filterOverlay");
    const sidebar = document.getElementById("sidebar");

    const gridViewBtn = document.getElementById("gridViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");

    let state = {
        categories: [],
        brands: [],
        colors: [],
        maxPrice: 5000,
        minRating: 0,
        inStock: false,
        search: "",
        sort: "default",
        perPage: 12,
        page: 1
    };

    function slug(str) {
        return str.toLowerCase().replace(/\s+/g, "-");
    }

    function updateCategoryCounts() {
        const catCounts = {};
        PRODUCTS.forEach(p => {
            catCounts[p.category] = (catCounts[p.category] || 0) + 1;
        });
        Object.keys(CATEGORY_ICONS).forEach(cat => {
            const el = document.getElementById("count-" + slug(cat));
            if (el) el.textContent = (catCounts[cat] || 0) + " Products";
        });
    }

    function starsHtml(rating) {
        let html = "";
        const full = Math.floor(rating);
        const half = rating - full >= 0.5;
        for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
        if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
        const remaining = 5 - full - (half ? 1 : 0);
        for (let i = 0; i < remaining; i++) html += '<i class="fa-regular fa-star"></i>';
        return html;
    }

    function getFiltered() {
        return PRODUCTS.filter(p => {
            if (state.categories.length && !state.categories.includes(p.category)) return false;
            if (state.brands.length && !state.brands.includes(p.brand)) return false;
            if (state.colors.length && !state.colors.includes(p.color)) return false;
            if (p.price > state.maxPrice) return false;
            if (p.rating < state.minRating) return false;
            if (state.inStock && !p.stock) return false;
            if (state.search && !p.name.toLowerCase().includes(state.search.toLowerCase())) return false;
            return true;
        });
    }

    function getSorted(list) {
        const sorted = list.slice();
        switch (state.sort) {
            case "latest":
                sorted.sort((a, b) => b.id - a.id);
                break;
            case "price-low":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                sorted.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        return sorted;
    }

    function renderChips() {
        const chips = [];
        state.categories.forEach(c => chips.push({ label: c, type: "category", value: c }));
        state.brands.forEach(b => chips.push({ label: b, type: "brand", value: b }));
        state.colors.forEach(c => chips.push({ label: c, type: "color", value: c }));
        if (state.maxPrice < 5000) chips.push({ label: "Under $" + state.maxPrice, type: "price" });
        if (state.minRating > 0) chips.push({ label: state.minRating + "★ & up", type: "rating" });
        if (state.inStock) chips.push({ label: "In Stock Only", type: "stock" });

        if (!chips.length) {
            activeChips.innerHTML = "";
            activeChips.style.display = "none";
            return;
        }
        activeChips.style.display = "flex";
        activeChips.innerHTML = chips.map(c =>
            `<span class="chip" data-type="${c.type}" data-value="${c.value || ""}">${c.label} <i class="fa-solid fa-xmark"></i></span>`
        ).join("") + `<span class="chip chip-clear" id="chipClear">Clear All</span>`;

        activeChips.querySelectorAll(".chip:not(.chip-clear)").forEach(chip => {
            chip.addEventListener("click", () => removeChip(chip.dataset.type, chip.dataset.value));
        });
        const chipClear = document.getElementById("chipClear");
        if (chipClear) chipClear.addEventListener("click", clearAllFilters);
    }

    function removeChip(type, value) {
        if (type === "category") {
            state.categories = state.categories.filter(v => v !== value);
            syncCheckboxes(categoryFilters, state.categories);
        } else if (type === "brand") {
            state.brands = state.brands.filter(v => v !== value);
            syncCheckboxes(brandFilters, state.brands);
        } else if (type === "color") {
            state.colors = state.colors.filter(v => v !== value);
            syncColorSwatches();
        } else if (type === "price") {
            state.maxPrice = 5000;
            priceRange.value = 5000;
            priceValue.textContent = "5000";
        } else if (type === "rating") {
            state.minRating = 0;
            ratingFilter.value = "0";
        } else if (type === "stock") {
            state.inStock = false;
            inStockOnly.checked = false;
        }
        state.page = 1;
        render();
    }

    function syncCheckboxes(container, values) {
        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = values.includes(cb.value);
        });
    }

    function syncColorSwatches() {
        colorFilters.querySelectorAll("span").forEach(sw => {
            sw.classList.toggle("selected", state.colors.includes(sw.dataset.color));
        });
    }

    function clearAllFilters() {
        state = { categories: [], brands: [], colors: [], maxPrice: 5000, minRating: 0, inStock: false, search: "", sort: "default", perPage: state.perPage, page: 1 };
        categoryFilters.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        brandFilters.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        colorFilters.querySelectorAll("span").forEach(sw => sw.classList.remove("selected"));
        priceRange.value = 5000;
        priceValue.textContent = "5000";
        ratingFilter.value = "0";
        inStockOnly.checked = false;
        sortSelect.value = "default";
        if (searchInput) searchInput.value = "";
        render();
    }

    function productCardHtml(p) {
        const discountBadge = p.discount > 0 ? `<span class="discount">-${p.discount}%</span>` : "";
        const stockBadge = p.stock
            ? `<span class="stock-badge in"><i class="fa-solid fa-circle-check"></i> In Stock</span>`
            : `<span class="stock-badge out"><i class="fa-solid fa-circle-xmark"></i> Out of Stock</span>`;
        const priceHtml = p.oldPrice
            ? `<span class="new-price">$${p.price}</span><span class="old-price">$${p.oldPrice}</span>`
            : `<span class="new-price">$${p.price}</span>`;

        return `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image color-${p.color}">
                ${discountBadge}
                <div class="product-actions">
                    <button title="Wishlist"><i class="fa-regular fa-heart"></i></button>
                    <button title="Quick View"><i class="fa-solid fa-eye"></i></button>
                    <button title="Compare"><i class="fa-solid fa-code-compare"></i></button>
                </div>
                <i class="fa-solid ${p.icon} product-icon"></i>
            </div>
            <div class="product-content">
                <p class="category">${p.category}</p>
                <h3>${p.name}</h3>
                <div class="rating">
                    ${starsHtml(p.rating)}
                    <span>(${p.reviews} Reviews)</span>
                </div>
                <div class="price">${priceHtml}</div>
                ${stockBadge}
                <button class="add-cart" ${p.stock ? "" : "disabled"}>${p.stock ? "Add To Cart" : "Notify Me"}</button>
            </div>
        </div>`;
    }

    function renderPagination(totalItems) {
        const totalPages = Math.max(1, Math.ceil(totalItems / state.perPage));
        if (state.page > totalPages) state.page = totalPages;

        let html = `<button id="pagePrev" ${state.page === 1 ? "disabled" : ""}><i class="fa-solid fa-angle-left"></i></button>`;

        const maxButtons = 5;
        let start = Math.max(1, state.page - Math.floor(maxButtons / 2));
        let end = Math.min(totalPages, start + maxButtons - 1);
        start = Math.max(1, end - maxButtons + 1);

        for (let i = start; i <= end; i++) {
            html += `<button class="page-num ${i === state.page ? "active" : ""}" data-page="${i}">${i}</button>`;
        }

        html += `<button id="pageNext" ${state.page === totalPages ? "disabled" : ""}><i class="fa-solid fa-angle-right"></i></button>`;

        pagination.innerHTML = html;

        const prevBtn = document.getElementById("pagePrev");
        const nextBtn = document.getElementById("pageNext");
        if (prevBtn) prevBtn.addEventListener("click", () => { if (state.page > 1) { state.page--; render(); scrollToGrid(); } });
        if (nextBtn) nextBtn.addEventListener("click", () => { if (state.page < totalPages) { state.page++; render(); scrollToGrid(); } });
        pagination.querySelectorAll(".page-num").forEach(btn => {
            btn.addEventListener("click", () => { state.page = parseInt(btn.dataset.page, 10); render(); scrollToGrid(); });
        });
    }

    function scrollToGrid() {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function render() {
        const filtered = getFiltered();
        const sorted = getSorted(filtered);

        const total = sorted.length;
        const totalPages = Math.max(1, Math.ceil(total / state.perPage));
        if (state.page > totalPages) state.page = totalPages;

        const startIdx = (state.page - 1) * state.perPage;
        const pageItems = sorted.slice(startIdx, startIdx + state.perPage);

        grid.innerHTML = pageItems.map(productCardHtml).join("");

        if (total === 0) {
            noResults.style.display = "block";
            grid.style.display = "none";
        } else {
            noResults.style.display = "none";
            grid.style.display = "grid";
        }

        const shownStart = total === 0 ? 0 : startIdx + 1;
        const shownEnd = Math.min(startIdx + state.perPage, total);
        resultsCount.innerHTML = `Showing <strong>${shownStart}-${shownEnd}</strong> of <strong>${total}</strong> Products`;

        renderPagination(total);
        renderChips();
    }

    // ---------- Event bindings ----------

    categoryFilters.addEventListener("change", (e) => {
        if (e.target.type !== "checkbox") return;
        state.categories = Array.from(categoryFilters.querySelectorAll('input:checked')).map(cb => cb.value);
        state.page = 1;
        render();
    });

    brandFilters.addEventListener("change", (e) => {
        if (e.target.type !== "checkbox") return;
        state.brands = Array.from(brandFilters.querySelectorAll('input:checked')).map(cb => cb.value);
        state.page = 1;
        render();
    });

    colorFilters.querySelectorAll("span").forEach(sw => {
        sw.addEventListener("click", () => {
            const color = sw.dataset.color;
            if (state.colors.includes(color)) {
                state.colors = state.colors.filter(c => c !== color);
            } else {
                state.colors.push(color);
            }
            syncColorSwatches();
            state.page = 1;
            render();
        });
    });

    priceRange.addEventListener("input", () => {
        state.maxPrice = parseInt(priceRange.value, 10);
        priceValue.textContent = state.maxPrice;
        state.page = 1;
        render();
    });

    ratingFilter.addEventListener("change", () => {
        state.minRating = parseFloat(ratingFilter.value);
        state.page = 1;
        render();
    });

    inStockOnly.addEventListener("change", () => {
        state.inStock = inStockOnly.checked;
        state.page = 1;
        render();
    });

    sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        state.page = 1;
        render();
    });

    perPageSelect.addEventListener("change", () => {
        state.perPage = parseInt(perPageSelect.value, 10);
        state.page = 1;
        render();
    });

    if (searchInput) {
        let debounce;
        searchInput.addEventListener("input", () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                state.search = searchInput.value.trim();
                state.page = 1;
                render();
            }, 250);
        });
    }

    clearFiltersBtn.addEventListener("click", clearAllFilters);

    // Category card quick-filter
    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const cat = card.dataset.cat;
            state.categories = [cat];
            syncCheckboxes(categoryFilters, state.categories);
            state.page = 1;
            render();
            document.querySelector(".shop-section").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Grid / List view toggle
    gridViewBtn.addEventListener("click", () => {
        grid.classList.remove("list-view");
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
    });
    listViewBtn.addEventListener("click", () => {
        grid.classList.add("list-view");
        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
    });

    // ---------- Mobile filter drawer ----------
    function openDrawer() {
        sidebar.classList.add("open");
        filterOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }
    function closeDrawer() {
        sidebar.classList.remove("open");
        filterOverlay.classList.remove("show");
        document.body.style.overflow = "";
    }
    filterToggle.addEventListener("click", openDrawer);
    closeFilters.addEventListener("click", closeDrawer);
    filterOverlay.addEventListener("click", closeDrawer);
    applyFiltersMobile.addEventListener("click", closeDrawer);

    // ---------- Init ----------
    updateCategoryCounts();
    render();
})();