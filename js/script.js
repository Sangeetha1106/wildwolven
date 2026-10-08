// Instant Theme Load to prevent flicker
(function() {
    const savedTheme = localStorage.getItem('wildWolvenTheme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    console.log("Wild Wolven website loaded successfully.");

    const productsData = [
        {
            id: 1,
            name: "Essential Black Oversized T-Shirt",
            category: "tshirts",
            categoryKey: "tshirts",
            displayCategory: "T-Shirts",
            price: 1499,
            originalPrice: 1999,
            discount: "25% OFF",
            rating: 4.8,
            badge: "NEW",
            description: "Premium oversized men's T-shirt crafted for everyday comfort with a bold Wild Wolven aesthetic. Heavyweight 240 GSM combed cotton.",
            images: [
                "images/products/tshirt-01.jpg",
                "images/products/tshirt-02.jpg",
                "images/category-tshirts.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 2,
            name: "Urban Gold Graphic T-Shirt",
            category: "tshirts",
            categoryKey: "tshirts",
            displayCategory: "T-Shirts",
            price: 1599,
            originalPrice: 2099,
            discount: "24% OFF",
            rating: 4.9,
            badge: "BEST SELLER",
            description: "Distinguished streetwear graphic t-shirt featuring metallic gold accents on high-grade breathable cotton.",
            images: [
                "images/products/tshirt-02.jpg",
                "images/products/tshirt-01.jpg",
                "images/category-tshirts.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 3,
            name: "Premium Classic Black Shirt",
            category: "shirts",
            categoryKey: "shirts",
            displayCategory: "Shirts",
            price: 1899,
            originalPrice: 2499,
            discount: "24% OFF",
            rating: 5.0,
            badge: "",
            description: "Crisp tailored button-down shirt for sophisticated evening events and modern luxury statement.",
            images: [
                "images/products/shirt-01.jpg",
                "images/products/shirt-02.jpg",
                "images/category-shirts.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 4,
            name: "Signature Relaxed Fit Shirt",
            category: "shirts",
            categoryKey: "shirts",
            displayCategory: "Shirts",
            price: 1999,
            originalPrice: 2599,
            discount: "23% OFF",
            rating: 4.8,
            badge: "LIMITED",
            description: "Relaxed fit linen-blend casual shirt with breathable fabric and minimalist designer tailoring.",
            images: [
                "images/products/shirt-02.jpg",
                "images/products/shirt-01.jpg",
                "images/category-shirts.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 5,
            name: "Wild Wolven Cargo Pants",
            category: "pants",
            categoryKey: "pants",
            displayCategory: "Pants",
            price: 2199,
            originalPrice: 2899,
            discount: "24% OFF",
            rating: 5.0,
            badge: "BEST SELLER",
            description: "Tactical utility cargo trousers with custom hardware, reinforced stitching, and gold zip details.",
            images: [
                "images/products/pants-01.jpg",
                "images/products/trackpants-01.jpg",
                "images/category-pants.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 6,
            name: "Premium Black Track Pants",
            category: "track-pants",
            categoryKey: "track-pants",
            displayCategory: "Track Pants",
            price: 1799,
            originalPrice: 2299,
            discount: "22% OFF",
            rating: 4.9,
            badge: "NEW",
            description: "Heavyweight luxury athletic track pants engineered for ultimate freedom of movement.",
            images: [
                "images/products/trackpants-01.jpg",
                "images/products/pants-01.jpg",
                "images/category-trackpants.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 7,
            name: "Signature Wolf Hoodie",
            category: "hoodies",
            categoryKey: "hoodies",
            displayCategory: "Hoodies",
            price: 2499,
            originalPrice: 3199,
            discount: "22% OFF",
            rating: 5.0,
            badge: "LIMITED",
            description: "Heavyweight French terry hoodie with custom embroidered emblem and signature relaxed drape.",
            images: [
                "images/products/hoodie-01.jpg",
                "images/category-hoodies.jpg",
                "images/products/tshirt-01.jpg",
                "images/hero-banner.jpg"
            ]
        },
        {
            id: 8,
            name: "Essential Street Shorts",
            category: "shorts",
            categoryKey: "shorts",
            displayCategory: "Shorts",
            price: 1299,
            originalPrice: 1699,
            discount: "24% OFF",
            rating: 4.8,
            badge: "",
            description: "Modern tailored shorts crafted from soft cotton twill for effortless warm-weather style.",
            images: [
                "images/products/shorts-01.jpg",
                "images/category-shorts.jpg",
                "images/products/pants-01.jpg",
                "images/hero-banner.jpg"
            ]
        }
    ];

    // Header Element References
    const siteHeader = document.getElementById('siteHeader');
    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const cartBadge = document.getElementById('cartBadge');
    const toastContainer = document.getElementById('toastContainer');

    // Local Storage Helpers (Primary key: wildWolvenCart)
    const CART_KEY = 'wildWolvenCart';
    const getStoredCart = () => {
        const primary = localStorage.getItem(CART_KEY);
        if (primary) return JSON.parse(primary);
        const legacy = localStorage.getItem('wild_wolven_cart');
        return legacy ? JSON.parse(legacy) : [];
    };

    const saveStoredCart = (cart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        localStorage.setItem('wild_wolven_cart', JSON.stringify(cart));
    };

    const getStoredWishlist = () => JSON.parse(localStorage.getItem('wildWolvenWishlist') || localStorage.getItem('wild_wolven_wishlist') || '[]');
    const saveStoredWishlist = (wishlist) => {
        localStorage.setItem('wildWolvenWishlist', JSON.stringify(wishlist));
        localStorage.setItem('wild_wolven_wishlist', JSON.stringify(wishlist));
    };

    // Update Cart Badge Count
    const updateCartCount = () => {
        const cart = getStoredCart();
        const totalQuantity = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
        if (cartBadge) {
            cartBadge.textContent = totalQuantity;
        }
        return totalQuantity;
    };
    updateCartCount();

    // 1. Toast Notification System
    const showToast = (message) => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span class="toast-text">${message}</span>
        `;
        toastContainer.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 350);
        }, 3000);
    };

    // Theme Switcher Logic (Dark Mode / Light Mode)
    const initTheme = () => {
        const savedTheme = localStorage.getItem('wildWolvenTheme') || 'dark';

        const applyTheme = (theme) => {
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            updateThemeUI(theme);
        };

        const updateThemeUI = (theme) => {
            const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
            const themeModeTexts = document.querySelectorAll('#themeModeText');
            const themeModeBadges = document.querySelectorAll('#themeModeBadge');

            themeToggleBtns.forEach(btn => {
                btn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode (Black & Gold)' : 'Switch to Light Mode (White & Gold)');
            });

            themeModeTexts.forEach(txt => {
                txt.textContent = theme === 'light' ? 'Light Theme' : 'Dark Theme';
            });

            themeModeBadges.forEach(badge => {
                badge.textContent = theme === 'light' ? 'LIGHT' : 'DARK';
            });
        };

        const toggleTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('wildWolvenTheme', newTheme);
            applyTheme(newTheme);
            showToast(`Switched to ${newTheme === 'light' ? 'Light Mode (White & Gold)' : 'Dark Mode (Black & Gold)'}`);
        };

        applyTheme(savedTheme);

        document.addEventListener('click', (e) => {
            const themeBtn = e.target.closest('.theme-toggle-btn') || e.target.closest('#mobileThemeToggleBtn');
            if (themeBtn) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
            }
        });
    };

    initTheme();

    // 2. Sticky / Scroll Header Effect
    const handleHeaderScroll = () => {
        if (!siteHeader) return;
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // 3. Mobile Drawer Controls
    const openMobileDrawer = () => {
        if (!mobileDrawer || !drawerOverlay) return;
        mobileDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        drawerOverlay.setAttribute('aria-hidden', 'false');
        if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileDrawer = () => {
        if (!mobileDrawer || !drawerOverlay) return;
        mobileDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        drawerOverlay.setAttribute('aria-hidden', 'true');
        if (mobileToggleBtn) mobileToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
            closeMobileDrawer();
        }
    });

    mobileNavLinks.forEach(link => {
        // Do not auto-close if clicking shop toggle or sub-links directly unless navigating
        if (!link.classList.contains('mobile-submenu-toggle') && !link.closest('.mobile-nav-row')) {
            link.addEventListener('click', closeMobileDrawer);
        }
    });

    // 4. Mobile Shop Submenu Accordion Toggle
    const mobileShopToggle = document.getElementById('mobileShopToggle');
    const mobileShopSubmenu = document.getElementById('mobileShopSubmenu');
    const mobileDropdownItem = document.getElementById('mobileDropdownItem');

    if (mobileShopToggle && mobileShopSubmenu) {
        mobileShopToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isOpen = mobileShopSubmenu.classList.contains('active') || (mobileDropdownItem && mobileDropdownItem.classList.contains('open'));
            if (isOpen) {
                mobileShopSubmenu.classList.remove('active');
                if (mobileDropdownItem) mobileDropdownItem.classList.remove('open');
                mobileShopToggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileShopSubmenu.classList.add('active');
                if (mobileDropdownItem) mobileDropdownItem.classList.add('open');
                mobileShopToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // 5. Active Link Highlighting Logic
    const updateActiveNavigation = () => {
        const path = window.location.pathname;
        const pageName = path.split('/').pop() || 'index.html';
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');

        const isHome = pageName === '' || pageName === 'index.html';
        const isShop = pageName === 'shop.html';
        const isAbout = pageName === 'about.html';
        const isContact = pageName === 'contact.html';

        // Desktop nav links
        const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            if (isHome && href === 'index.html') {
                link.classList.add('active');
            } else if (isShop && href.startsWith('shop.html')) {
                link.classList.add('active');
            } else if (isAbout && href === 'about.html') {
                link.classList.add('active');
            } else if (isContact && href === 'contact.html') {
                link.classList.add('active');
            }
        });

        // Shop Dropdown links (if viewing category)
        if (isShop && currentCategory) {
            const dropdownLinks = document.querySelectorAll('.dropdown-link');
            dropdownLinks.forEach(dLink => {
                const href = dLink.getAttribute('href');
                if (href.includes(`category=${currentCategory}`)) {
                    dLink.classList.add('active');
                } else {
                    dLink.classList.remove('active');
                }
            });

            const mobileSubmenuLinks = document.querySelectorAll('.mobile-submenu-link');
            mobileSubmenuLinks.forEach(mLink => {
                const href = mLink.getAttribute('href');
                if (href.includes(`category=${currentCategory}`)) {
                    mLink.classList.add('active');
                    if (mobileShopSubmenu) mobileShopSubmenu.classList.add('active');
                    if (mobileDropdownItem) mobileDropdownItem.classList.add('open');
                    if (mobileShopToggle) mobileShopToggle.setAttribute('aria-expanded', 'true');
                } else {
                    mLink.classList.remove('active');
                }
            });
        }

        // Mobile main nav links
        const mobileMainLinks = document.querySelectorAll('.mobile-nav-link');
        mobileMainLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                link.classList.remove('active');
                if (isHome && href === 'index.html') {
                    link.classList.add('active');
                } else if (isShop && href === 'shop.html') {
                    link.classList.add('active');
                } else if (isAbout && href === 'about.html') {
                    link.classList.add('active');
                } else if (isContact && href === 'contact.html') {
                    link.classList.add('active');
                }
            }
        });
    };
    updateActiveNavigation();

    // 6. Search Button Handler
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(sBtn => {
        sBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const query = prompt("Search Wild Wolven Collection (e.g., T-Shirts, Hoodies, Cargo Pants):");
            if (query && query.trim() !== '') {
                window.location.href = `shop.html?search=${encodeURIComponent(query.trim())}`;
            }
        });
    });

    // 7. Wishlist Header Button Handler
    const wishlistHeaderBtns = document.querySelectorAll('.wishlist-btn');
    wishlistHeaderBtns.forEach(wBtn => {
        wBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'shop.html';
        });
    });

    // 8. Account Header Button Handler
    const accountBtns = document.querySelectorAll('.account-btn');
    accountBtns.forEach(aBtn => {
        aBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("Account portal coming soon.");
        });
    });

    // Helper to render product HTML string
    const renderProductCardHTML = (p, wishlist) => {
        const isWish = wishlist.includes(p.id);
        return `
            <article class="product-card">
                <div class="product-image-container">
                    ${p.badge ? `<span class="product-tag tag-gold">${p.badge}</span>` : ''}
                    <button class="wishlist-toggle-btn ${isWish ? 'active' : ''}" aria-label="Add ${p.name} to wishlist" data-id="${p.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWish ? 'var(--gold)' : 'none'}" stroke="${isWish ? 'var(--gold)' : 'currentColor'}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <a href="product.html?id=${p.id}" class="product-image-link">
                        <img src="${p.images[0]}" alt="${p.name}" class="product-image" loading="lazy">
                    </a>
                </div>
                <div class="product-info">
                    <span class="product-category">${p.displayCategory || p.category}</span>
                    <h3 class="product-title" title="${p.name}"><a href="product.html?id=${p.id}">${p.name}</a></h3>
                    <div class="product-rating">
                        <span class="rating-badge">${p.rating.toFixed(1)} ★</span>
                        <span class="rating-val">Reviews</span>
                    </div>
                    <div class="product-price-row">
                        <div class="price-box">
                            <span class="current-price">₹${p.price.toLocaleString('en-IN')}</span>
                            <span class="original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <span class="discount-badge">${p.discount}</span>
                    </div>
                    <button class="btn btn-add-cart" data-id="${p.id}" data-name="${p.name}">ADD TO CART</button>
                </div>
            </article>
        `;
    };

    // Attach card event listeners (Wishlist & Add to Cart)
    const bindProductCardEvents = (containerEl) => {
        if (!containerEl) return;

        const cardWishlistBtns = containerEl.querySelectorAll('.wishlist-toggle-btn');
        cardWishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                btn.classList.toggle('active');
                const isWishlisted = btn.classList.contains('active');
                const productId = parseInt(btn.dataset.id, 10);
                const svg = btn.querySelector('svg');
                let currentWishlist = getStoredWishlist();

                if (isWishlisted) {
                    if (!currentWishlist.includes(productId)) currentWishlist.push(productId);
                    if (svg) {
                        svg.setAttribute('fill', 'var(--gold)');
                        svg.setAttribute('stroke', 'var(--gold)');
                    }
                    showToast(`Added item to wishlist`);
                } else {
                    currentWishlist = currentWishlist.filter(id => id !== productId);
                    if (svg) {
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', 'currentColor');
                    }
                    showToast(`Removed from wishlist`);
                }
                saveStoredWishlist(currentWishlist);
            });
        });

        const cardCartBtns = containerEl.querySelectorAll('.btn-add-cart');
        cardCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(btn.dataset.id, 10);
                const productName = btn.dataset.name || 'Item';
                const product = productsData.find(p => p.id === productId) || { id: productId, name: productName, price: 1499 };

                const cart = getStoredCart();
                const existingIndex = cart.findIndex(item => item.id === productId && item.size === 'M');
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        size: 'M',
                        quantity: 1,
                        image: product.images ? product.images[0] : ''
                    });
                }
                saveStoredCart(cart);
                updateCartCount();

                showToast("Added to cart successfully.");

                const originalText = btn.textContent;
                btn.textContent = 'ADDED ✓';
                btn.classList.add('added');
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('added');
                }, 1500);
            });
        });
    };

    // Bind Homepage Product Section if present
    const homepageProductGrid = document.querySelector('.products-section .product-grid');
    if (homepageProductGrid) {
        bindProductCardEvents(homepageProductGrid);
    }

    // ==========================================================================
    // 7. SHOP CATALOG PAGE LOGIC (shop.html)
    // ==========================================================================
    const shopProductGrid = document.getElementById('shopProductGrid');
    if (shopProductGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        let selectedCategory = (urlParams.get('category') || 'all').trim().toLowerCase();
        let searchQuery = (urlParams.get('search') || '').trim().toLowerCase();
        let currentSort = 'featured';

        const shopTitle = document.getElementById('shopTitle');
        const shopSubTitle = document.getElementById('shopSubTitle');
        const productCount = document.getElementById('productCount');
        const sortSelect = document.getElementById('sortSelect');
        const categoryPills = document.querySelectorAll('.filter-pill');
        const shopSearchInput = document.getElementById('shopSearchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        const emptyShopContainer = document.getElementById('emptyShopContainer');
        const resetShopFiltersBtn = document.getElementById('resetShopFiltersBtn');

        if (shopSearchInput && searchQuery) {
            shopSearchInput.value = searchQuery;
            if (clearSearchBtn) clearSearchBtn.style.display = 'block';
        }

        const normalizeCat = (cat) => {
            if (!cat) return '';
            const s = cat.toString().toLowerCase().trim().replace(/[\s_-]+/g, '');
            if (s === 'tshirt' || s === 'tshirts') return 'tshirts';
            if (s === 'shirt' || s === 'shirts') return 'shirts';
            if (s === 'pant' || s === 'pants') return 'pants';
            if (s === 'hoodie' || s === 'hoodies') return 'hoodies';
            if (s === 'trackpant' || s === 'trackpants') return 'track-pants';
            if (s === 'short' || s === 'shorts') return 'shorts';
            return s;
        };

        const syncUrlState = () => {
            const url = new URL(window.location.href);
            if (selectedCategory && selectedCategory !== 'all') {
                url.searchParams.set('category', selectedCategory);
            } else {
                url.searchParams.delete('category');
            }
            if (searchQuery) {
                url.searchParams.set('search', searchQuery);
            } else {
                url.searchParams.delete('search');
            }
            window.history.pushState({}, '', url.toString());
        };

        const getCategoryTitle = (cat) => {
            const c = (cat || 'all').toLowerCase().trim();
            if (c === 'tshirts' || c === 't-shirts') return 'T-SHIRTS';
            if (c === 'shirts') return 'SHIRTS';
            if (c === 'pants') return 'PANTS';
            if (c === 'hoodies') return 'HOODIES';
            if (c === 'track-pants' || c === 'trackpants') return 'TRACK PANTS';
            if (c === 'shorts') return 'SHORTS';
            return 'SHOP ALL';
        };

        const updateCatalog = () => {
            let filtered = productsData;

            // 1. Category Filtering
            if (selectedCategory && selectedCategory !== 'all') {
                const targetNorm = normalizeCat(selectedCategory);
                filtered = filtered.filter(p => {
                    const pCatNorm = normalizeCat(p.category);
                    const pKeyNorm = normalizeCat(p.categoryKey);
                    const pDispNorm = normalizeCat(p.displayCategory);
                    return pCatNorm === targetNorm || pKeyNorm === targetNorm || pDispNorm === targetNorm;
                });
            }

            // 2. Search Query Filtering (by product name or category)
            if (searchQuery !== '') {
                filtered = filtered.filter(p => 
                    p.name.toLowerCase().includes(searchQuery) || 
                    (p.displayCategory && p.displayCategory.toLowerCase().includes(searchQuery)) ||
                    (p.category && p.category.toLowerCase().includes(searchQuery))
                );
            }

            // 3. Sorting
            if (currentSort === 'price-low') {
                filtered = [...filtered].sort((a, b) => a.price - b.price);
            } else if (currentSort === 'price-high') {
                filtered = [...filtered].sort((a, b) => b.price - a.price);
            } else if (currentSort === 'name-az') {
                filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
            } else if (currentSort === 'name-za') {
                filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
            } else if (currentSort === 'rating') {
                filtered = [...filtered].sort((a, b) => b.rating - a.rating);
            }

            // 4. Update Header Title & Subtitle
            if (shopTitle) {
                if (searchQuery !== '') {
                    shopTitle.textContent = "SEARCH RESULTS";
                    if (shopSubTitle) {
                        shopSubTitle.textContent = selectedCategory !== 'all' 
                            ? `RESULTS FOR "${searchQuery.toUpperCase()}" IN ${getCategoryTitle(selectedCategory)}`
                            : `RESULTS FOR "${searchQuery.toUpperCase()}"`;
                    }
                } else {
                    shopTitle.textContent = getCategoryTitle(selectedCategory);
                    if (shopSubTitle) shopSubTitle.textContent = "WILD WOLVEN COLLECTION";
                }
            }

            // 5. Product Count Display (Removed as requested)
            if (productCount) {
                productCount.textContent = '';
                productCount.style.display = 'none';
            }

            // 6. Handle Empty State vs Product Grid
            if (filtered.length === 0) {
                shopProductGrid.style.display = 'none';
                if (emptyShopContainer) emptyShopContainer.style.display = 'flex';
            } else {
                shopProductGrid.style.display = 'grid';
                if (emptyShopContainer) emptyShopContainer.style.display = 'none';
                const wishlist = getStoredWishlist();
                shopProductGrid.innerHTML = filtered.map(p => renderProductCardHTML(p, wishlist)).join('');
                bindProductCardEvents(shopProductGrid);
            }

            // Update category pills active state if present
            categoryPills.forEach(pill => {
                if (pill.dataset.category === selectedCategory) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            });
        };

        // Click Event Handlers for Navigation Dropdown & Mobile Submenu Links when on shop.html
        document.querySelectorAll('.dropdown-link, .mobile-submenu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.includes('shop.html')) {
                    e.preventDefault();
                    const urlObj = new URL(href, window.location.origin);
                    const catParam = urlObj.searchParams.get('category') || 'all';
                    selectedCategory = catParam.trim().toLowerCase();
                    searchQuery = '';
                    if (shopSearchInput) shopSearchInput.value = '';
                    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
                    syncUrlState();
                    updateCatalog();
                    updateActiveNavigation();
                    if (typeof closeMobileDrawer === 'function') closeMobileDrawer();
                }
            });
        });

        // Category Pills Event Listeners
        categoryPills.forEach(pill => {
            pill.addEventListener('click', () => {
                selectedCategory = pill.dataset.category;
                syncUrlState();
                updateCatalog();
                updateActiveNavigation();
            });
        });

        // Search Input Listeners
        if (shopSearchInput) {
            shopSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                if (clearSearchBtn) {
                    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
                }
                syncUrlState();
                updateCatalog();
            });
        }

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchQuery = '';
                if (shopSearchInput) shopSearchInput.value = '';
                clearSearchBtn.style.display = 'none';
                syncUrlState();
                updateCatalog();
            });
        }

        // Sort Select Listener
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                updateCatalog();
            });
        }

        // Empty State Reset Filters Listener
        if (resetShopFiltersBtn) {
            resetShopFiltersBtn.addEventListener('click', () => {
                selectedCategory = 'all';
                searchQuery = '';
                currentSort = 'featured';
                if (shopSearchInput) shopSearchInput.value = '';
                if (clearSearchBtn) clearSearchBtn.style.display = 'none';
                if (sortSelect) sortSelect.value = 'featured';
                syncUrlState();
                updateCatalog();
                updateActiveNavigation();
            });
        }

        // Browser history navigation (Back/Forward) listener
        window.addEventListener('popstate', () => {
            const params = new URLSearchParams(window.location.search);
            selectedCategory = (params.get('category') || 'all').trim().toLowerCase();
            searchQuery = (params.get('search') || '').trim().toLowerCase();
            if (shopSearchInput) {
                shopSearchInput.value = searchQuery;
                if (clearSearchBtn) clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
            }
            updateCatalog();
            updateActiveNavigation();
        });

        updateCatalog();
    }

    // ==========================================================================
    // 8. PRODUCT DETAILS PAGE LOGIC (product.html)
    // ==========================================================================
    const detailTitle = document.getElementById('detailTitle');
    if (detailTitle) {
        const urlParams = new URLSearchParams(window.location.search);
        const productIdParam = parseInt(urlParams.get('id'), 10) || 1;
        const currentProduct = productsData.find(p => p.id === productIdParam) || productsData[0];

        const breadcrumbTitle = document.getElementById('breadcrumbTitle');
        const breadcrumbCategory = document.getElementById('breadcrumbCategory');
        if (breadcrumbTitle) breadcrumbTitle.textContent = currentProduct.name;
        if (breadcrumbCategory) {
            breadcrumbCategory.textContent = currentProduct.category;
            breadcrumbCategory.href = `shop.html?category=${currentProduct.categoryKey}`;
        }
        detailTitle.textContent = currentProduct.name;

        const detailCategory = document.getElementById('detailCategory');
        const detailBadge = document.getElementById('detailBadge');
        const detailRatingVal = document.getElementById('detailRatingVal');
        const detailPrice = document.getElementById('detailPrice');
        const detailOrigPrice = document.getElementById('detailOrigPrice');
        const detailDiscount = document.getElementById('detailDiscount');
        const detailDesc = document.getElementById('detailDesc');

        if (detailCategory) detailCategory.textContent = currentProduct.category;
        if (detailBadge) {
            if (currentProduct.badge) {
                detailBadge.textContent = currentProduct.badge;
                detailBadge.style.display = 'inline-block';
            } else {
                detailBadge.style.display = 'none';
            }
        }
        if (detailRatingVal) detailRatingVal.textContent = currentProduct.rating.toFixed(1);
        if (detailPrice) detailPrice.textContent = `₹${currentProduct.price.toLocaleString('en-IN')}`;
        if (detailOrigPrice) detailOrigPrice.textContent = `₹${currentProduct.originalPrice.toLocaleString('en-IN')}`;
        if (detailDiscount) detailDiscount.textContent = currentProduct.discount;
        if (detailDesc) detailDesc.textContent = currentProduct.description;

        const mainProductImg = document.getElementById('mainProductImg');
        const thumbnailList = document.getElementById('thumbnailList');

        if (mainProductImg && thumbnailList) {
            mainProductImg.src = currentProduct.images[0];
            mainProductImg.alt = currentProduct.name;

            thumbnailList.innerHTML = '';
            currentProduct.images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.alt = `${currentProduct.name} View ${index + 1}`;
                thumb.className = `thumb-img ${index === 0 ? 'active' : ''}`;
                thumb.addEventListener('click', () => {
                    mainProductImg.src = imgSrc;
                    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                thumbnailList.appendChild(thumb);
            });
        }

        const detailWishlistBtn = document.getElementById('detailWishlistBtn');
        if (detailWishlistBtn) {
            let wishlistStore = getStoredWishlist();
            if (wishlistStore.includes(currentProduct.id)) {
                detailWishlistBtn.classList.add('active');
            }
            detailWishlistBtn.addEventListener('click', () => {
                detailWishlistBtn.classList.toggle('active');
                const isWish = detailWishlistBtn.classList.contains('active');
                let currentWish = getStoredWishlist();
                if (isWish) {
                    if (!currentWish.includes(currentProduct.id)) currentWish.push(currentProduct.id);
                    showToast(`Added ${currentProduct.name} to wishlist`);
                } else {
                    currentWish = currentWish.filter(id => id !== currentProduct.id);
                    showToast(`Removed from wishlist`);
                }
                saveStoredWishlist(currentWish);
            });
        }

        let selectedSize = null;
        const sizeBtns = document.querySelectorAll('.size-btn');
        const sizeErrorMsg = document.getElementById('sizeErrorMsg');

        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => {
                    b.classList.remove('active');
                    b.classList.remove('error-border');
                });
                btn.classList.add('active');
                selectedSize = btn.dataset.size;
                if (sizeErrorMsg) sizeErrorMsg.classList.remove('show');
            });
        });

        let currentQty = 1;
        const qtyInput = document.getElementById('qtyInput');
        const qtyMinus = document.getElementById('qtyMinus');
        const qtyPlus = document.getElementById('qtyPlus');

        if (qtyMinus && qtyInput) {
            qtyMinus.addEventListener('click', () => {
                if (currentQty > 1) {
                    currentQty--;
                    qtyInput.value = currentQty;
                }
            });
        }

        if (qtyPlus && qtyInput) {
            qtyPlus.addEventListener('click', () => {
                currentQty++;
                qtyInput.value = currentQty;
            });
        }

        const btnAddToCart = document.getElementById('btnAddToCart');
        if (btnAddToCart) {
            btnAddToCart.addEventListener('click', () => {
                if (!selectedSize) {
                    if (sizeErrorMsg) sizeErrorMsg.classList.add('show');
                    sizeBtns.forEach(b => b.classList.add('error-border'));
                    showToast("Please select a size first.");
                    return;
                }

                const cart = getStoredCart();
                const existingIndex = cart.findIndex(item => item.id === currentProduct.id && item.size === selectedSize);
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += currentQty;
                } else {
                    cart.push({
                        id: currentProduct.id,
                        name: currentProduct.name,
                        price: currentProduct.price,
                        size: selectedSize,
                        quantity: currentQty,
                        image: currentProduct.images[0]
                    });
                }

                saveStoredCart(cart);
                updateCartCount();
                showToast("Added to cart successfully.");
            });
        }

        const btnBuyNow = document.getElementById('btnBuyNow');
        if (btnBuyNow) {
            btnBuyNow.addEventListener('click', () => {
                if (!selectedSize) {
                    if (sizeErrorMsg) sizeErrorMsg.classList.add('show');
                    sizeBtns.forEach(b => b.classList.add('error-border'));
                    showToast("Please select a size first.");
                    return;
                }

                const checkoutItem = {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    size: selectedSize,
                    quantity: currentQty,
                    image: currentProduct.images[0]
                };

                localStorage.setItem('wild_wolven_checkout', JSON.stringify([checkoutItem]));
                window.location.href = 'checkout.html';
            });
        }

        const relatedProductGrid = document.getElementById('relatedProductGrid');
        if (relatedProductGrid) {
            const wishlist = getStoredWishlist();
            const relatedProducts = productsData.filter(p => p.id !== currentProduct.id).slice(0, 4);
            relatedProductGrid.innerHTML = relatedProducts.map(p => renderProductCardHTML(p, wishlist)).join('');
            bindProductCardEvents(relatedProductGrid);
        }
    }

    // ==========================================================================
    // 9. CART PAGE LOGIC (cart.html)
    // ==========================================================================
    const cartItemsList = document.getElementById('cartItemsList');
    if (cartItemsList) {
        const activeCartGrid = document.getElementById('activeCartGrid');
        const emptyCartContainer = document.getElementById('emptyCartContainer');
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryTotal = document.getElementById('summaryTotal');
        const btnProceedCheckout = document.getElementById('btnProceedCheckout');

        const renderCartPage = () => {
            const cart = getStoredCart();

            if (cart.length === 0) {
                if (activeCartGrid) activeCartGrid.style.display = 'none';
                if (emptyCartContainer) emptyCartContainer.style.display = 'flex';
                updateCartCount();
                return;
            }

            if (activeCartGrid) activeCartGrid.style.display = 'grid';
            if (emptyCartContainer) emptyCartContainer.style.display = 'none';

            let subtotal = 0;

            cartItemsList.innerHTML = cart.map((item, index) => {
                const itemQty = parseInt(item.quantity, 10) || 1;
                const itemTotal = item.price * itemQty;
                subtotal += itemTotal;

                return `
                    <div class="cart-item" data-index="${index}">
                        <div class="cart-item-image-wrapper">
                            <img src="${item.image || 'images/products/tshirt-01.jpg'}" alt="${item.name}" class="cart-item-image">
                        </div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-title"><a href="product.html?id=${item.id}">${item.name}</a></h3>
                            <div class="cart-item-meta">
                                <span>Size: <strong class="cart-item-size">${item.size}</strong></span>
                                <span class="cart-item-unit-price">₹${item.price.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="cart-item-controls-row">
                                <div class="qty-control">
                                    <button type="button" class="qty-btn cart-qty-minus" data-index="${index}" aria-label="Decrease quantity">−</button>
                                    <input type="number" class="qty-input" value="${itemQty}" readonly aria-label="Quantity">
                                    <button type="button" class="qty-btn cart-qty-plus" data-index="${index}" aria-label="Increase quantity">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="cart-item-total-col">
                            <span class="cart-item-total">₹${itemTotal.toLocaleString('en-IN')}</span>
                            <button type="button" class="btn-remove-item" data-index="${index}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

            // Update Summary Totals
            if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
            if (summaryTotal) summaryTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

            updateCartCount();

            // Bind Cart Item Quantity Controls
            const minusBtns = cartItemsList.querySelectorAll('.cart-qty-minus');
            const plusBtns = cartItemsList.querySelectorAll('.cart-qty-plus');
            const removeBtns = cartItemsList.querySelectorAll('.btn-remove-item');

            minusBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const currentCart = getStoredCart();
                    if (currentCart[idx] && currentCart[idx].quantity > 1) {
                        currentCart[idx].quantity -= 1;
                        saveStoredCart(currentCart);
                        renderCartPage();
                    }
                });
            });

            plusBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    const currentCart = getStoredCart();
                    if (currentCart[idx]) {
                        currentCart[idx].quantity += 1;
                        saveStoredCart(currentCart);
                        renderCartPage();
                    }
                });
            });

            removeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const idx = parseInt(btn.dataset.index, 10);
                    let currentCart = getStoredCart();
                    if (currentCart[idx]) {
                        const removedItemName = currentCart[idx].name;
                        currentCart.splice(idx, 1);
                        saveStoredCart(currentCart);
                        showToast(`Item removed from cart.`);
                        renderCartPage();
                    }
                });
            });
        };

        if (btnProceedCheckout) {
            btnProceedCheckout.addEventListener('click', () => {
                const currentCart = getStoredCart();
                if (currentCart.length === 0) {
                    showToast("Your cart is empty.");
                    return;
                }
                localStorage.setItem('wild_wolven_checkout', JSON.stringify(currentCart));
                window.location.href = 'checkout.html';
            });
        }

        renderCartPage();
    }

    // ==========================================================================
    // 10. CONTACT FORM HANDLING (contact.html)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formErrorBanner = document.getElementById('contactFormError');

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Name validation
            if (!nameInput || !nameInput.value.trim()) {
                isValid = false;
                if (nameInput) nameInput.classList.add('error');
                if (nameError) nameError.classList.add('show');
            } else {
                if (nameInput) nameInput.classList.remove('error');
                if (nameError) nameError.classList.remove('show');
            }

            // Email validation
            if (!emailInput || !emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
                isValid = false;
                if (emailInput) emailInput.classList.add('error');
                if (emailError) emailError.classList.add('show');
            } else {
                if (emailInput) emailInput.classList.remove('error');
                if (emailError) emailError.classList.remove('show');
            }

            // Message validation
            if (!messageInput || !messageInput.value.trim()) {
                isValid = false;
                if (messageInput) messageInput.classList.add('error');
                if (messageError) messageError.classList.add('show');
            } else {
                if (messageInput) messageInput.classList.remove('error');
                if (messageError) messageError.classList.remove('show');
            }

            if (!isValid) {
                if (formErrorBanner) {
                    formErrorBanner.textContent = "Please fill in all required fields correctly.";
                    formErrorBanner.style.display = 'block';
                }
                return;
            }

            if (formErrorBanner) {
                formErrorBanner.style.display = 'none';
            }

            // Show success toast
            showToast("Thank you for contacting Wild Wolven. We'll get back to you soon.");

            // Reset Form
            contactForm.reset();
        });
    }

    // ==========================================================================
    // 11. CHECKOUT PAGE LOGIC (checkout.html)
    // ==========================================================================
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        const checkoutItemsList = document.getElementById('checkoutItemsList');
        const checkoutSubtotal = document.getElementById('checkoutSubtotal');
        const checkoutShipping = document.getElementById('checkoutShipping');
        const checkoutDiscount = document.getElementById('checkoutDiscount');
        const discountRow = document.getElementById('discountRow');
        const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
        const couponInput = document.getElementById('couponInput');
        const btnApplyCoupon = document.getElementById('btnApplyCoupon');
        const couponStatusMsg = document.getElementById('couponStatusMsg');

        // Fetch Checkout Items
        let checkoutItems = [];
        try {
            const rawCheckout = localStorage.getItem('wild_wolven_checkout');
            if (rawCheckout) {
                checkoutItems = JSON.parse(rawCheckout);
            }
        } catch (e) {
            checkoutItems = [];
        }

        // Fallback to general cart if single checkout item is empty
        if (!checkoutItems || checkoutItems.length === 0) {
            checkoutItems = getStoredCart();
        }

        let appliedDiscountPercent = 0;
        let appliedFlatDiscount = 0;
        let shippingFee = 0;

        // Render Checkout Item Rows & Calculate Prices
        const renderCheckoutSummary = () => {
            if (!checkoutItems || checkoutItems.length === 0) {
                if (checkoutItemsList) {
                    checkoutItemsList.innerHTML = `<p style="color: #94A3B8; font-size: 0.85rem;">No items selected for checkout. <a href="shop.html" class="text-gold">Return to shop</a></p>`;
                }
                if (checkoutSubtotal) checkoutSubtotal.textContent = '₹0';
                if (checkoutGrandTotal) checkoutGrandTotal.textContent = '₹0';
                return;
            }

            let itemsTotal = 0;
            if (checkoutItemsList) {
                checkoutItemsList.innerHTML = checkoutItems.map(item => {
                    const qty = parseInt(item.quantity, 10) || 1;
                    const total = item.price * qty;
                    itemsTotal += total;
                    return `
                        <div class="checkout-item-row">
                            <img src="${item.image || 'images/products/tshirt-01.jpg'}" alt="${item.name}" class="checkout-item-thumb">
                            <div class="checkout-item-info">
                                <h4 class="checkout-item-name">${item.name}</h4>
                                <span class="checkout-item-meta">Size: ${item.size} | Qty: ${qty}</span>
                            </div>
                            <span class="checkout-item-price">₹${total.toLocaleString('en-IN')}</span>
                        </div>
                    `;
                }).join('');
            }

            // Calculate discounts
            let discountAmount = 0;
            if (appliedDiscountPercent > 0) {
                discountAmount = Math.round(itemsTotal * (appliedDiscountPercent / 100));
            } else if (appliedFlatDiscount > 0) {
                discountAmount = appliedFlatDiscount;
            }

            const grandTotal = Math.max(0, itemsTotal + shippingFee - discountAmount);

            if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${itemsTotal.toLocaleString('en-IN')}`;
            if (checkoutShipping) checkoutShipping.textContent = shippingFee === 0 ? 'FREE' : `₹${shippingFee}`;
            
            if (discountAmount > 0) {
                if (discountRow) discountRow.style.display = 'flex';
                if (checkoutDiscount) checkoutDiscount.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
            } else {
                if (discountRow) discountRow.style.display = 'none';
            }

            if (checkoutGrandTotal) checkoutGrandTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
        };

        renderCheckoutSummary();

        // Delivery Method Radio Listeners
        const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                document.querySelectorAll('.delivery-option-card').forEach(card => card.classList.remove('active'));
                radio.closest('.delivery-option-card').classList.add('active');
                if (radio.value === 'express') {
                    shippingFee = 100;
                } else {
                    shippingFee = 0;
                }
                renderCheckoutSummary();
            });
        });

        // Coupon Code Listener
        if (btnApplyCoupon && couponInput) {
            btnApplyCoupon.addEventListener('click', () => {
                const code = couponInput.value.trim().toUpperCase();
                if (!code) {
                    if (couponStatusMsg) {
                        couponStatusMsg.textContent = "Please enter a valid promo code.";
                        couponStatusMsg.className = "coupon-status-msg error";
                    }
                    return;
                }

                if (code === 'WILD10' || code === 'WELCOME10') {
                    appliedDiscountPercent = 10;
                    appliedFlatDiscount = 0;
                    if (couponStatusMsg) {
                        couponStatusMsg.textContent = "Coupon WILD10 applied! 10% Discount unlocked.";
                        couponStatusMsg.className = "coupon-status-msg success";
                    }
                } else if (code === 'WELCOME500' || code === 'WILD500') {
                    appliedDiscountPercent = 0;
                    appliedFlatDiscount = 500;
                    if (couponStatusMsg) {
                        couponStatusMsg.textContent = "Coupon WELCOME500 applied! ₹500 Discount unlocked.";
                        couponStatusMsg.className = "coupon-status-msg success";
                    }
                } else {
                    appliedDiscountPercent = 0;
                    appliedFlatDiscount = 0;
                    if (couponStatusMsg) {
                        couponStatusMsg.textContent = "Invalid coupon code. Try 'WILD10'.";
                        couponStatusMsg.className = "coupon-status-msg error";
                    }
                }
                renderCheckoutSummary();
            });
        }

        // Payment Tab Switching
        const paymentTabs = document.querySelectorAll('.payment-tab');
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                paymentTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const selectedTab = tab.dataset.tab;

                document.querySelectorAll('.payment-tab-content').forEach(c => c.classList.remove('active'));
                const targetContent = document.getElementById(`tabContent${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}`);
                if (targetContent) targetContent.classList.add('active');
            });
        });

        // Form Validation & Place Order Submission
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('checkoutEmail');
            const phoneInput = document.getElementById('checkoutPhone');
            const firstNameInput = document.getElementById('firstName');
            const lastNameInput = document.getElementById('lastName');
            const addressInput = document.getElementById('streetAddress');
            const pincodeInput = document.getElementById('pincode');
            const cityInput = document.getElementById('city');

            const emailError = document.getElementById('emailError');
            const phoneError = document.getElementById('phoneError');
            const firstNameError = document.getElementById('firstNameError');
            const lastNameError = document.getElementById('lastNameError');
            const addressError = document.getElementById('addressError');
            const pincodeError = document.getElementById('pincodeError');
            const cityError = document.getElementById('cityError');

            let isValid = true;

            const validateField = (input, errorEl, condition) => {
                if (!input || !condition) {
                    if (input) input.classList.add('error');
                    if (errorEl) errorEl.classList.add('show');
                    isValid = false;
                } else {
                    if (input) input.classList.remove('error');
                    if (errorEl) errorEl.classList.remove('show');
                }
            };

            const isEmailValid = emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            const isPhoneValid = phoneInput && /^\d{10}$/.test(phoneInput.value.trim());
            const isPincodeValid = pincodeInput && /^\d{6}$/.test(pincodeInput.value.trim());

            validateField(emailInput, emailError, isEmailValid);
            validateField(phoneInput, phoneError, isPhoneValid);
            validateField(firstNameInput, firstNameError, firstNameInput && firstNameInput.value.trim() !== '');
            validateField(lastNameInput, lastNameError, lastNameInput && lastNameInput.value.trim() !== '');
            validateField(addressInput, addressError, addressInput && addressInput.value.trim() !== '');
            validateField(pincodeInput, pincodeError, isPincodeValid);
            validateField(cityInput, cityError, cityInput && cityInput.value.trim() !== '');

            if (!isValid) {
                showToast("Please fill in all required shipping fields correctly.");
                const firstError = document.querySelector('.form-control.error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Show Processing Loader Overlay
            const orderLoaderOverlay = document.getElementById('orderLoaderOverlay');
            if (orderLoaderOverlay) orderLoaderOverlay.classList.add('active');

            setTimeout(() => {
                if (orderLoaderOverlay) orderLoaderOverlay.classList.remove('active');

                // Generate Order ID & Delivery Date
                const randomId = Math.floor(10000 + Math.random() * 90000);
                const orderId = `#WW-${randomId}`;

                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + (shippingFee === 100 ? 2 : 4));
                const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = deliveryDate.toLocaleDateString('en-US', dateOptions);

                // Populate Order Success Modal
                const successOrderId = document.getElementById('successOrderId');
                const successEstDelivery = document.getElementById('successEstDelivery');
                const successShippingAddress = document.getElementById('successShippingAddress');
                const orderSuccessOverlay = document.getElementById('orderSuccessOverlay');

                if (successOrderId) successOrderId.textContent = orderId;
                if (successEstDelivery) successEstDelivery.textContent = `Arriving by ${formattedDate}`;
                if (successShippingAddress) {
                    successShippingAddress.textContent = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}, ${cityInput.value.trim()} (${pincodeInput.value.trim()})`;
                }

                // Clear stored checkout & cart
                saveStoredCart([]);
                localStorage.removeItem('wild_wolven_checkout');
                updateCartCount();

                // Show Success Screen
                if (orderSuccessOverlay) orderSuccessOverlay.classList.add('active');
            }, 1800);
        });
    }
});


