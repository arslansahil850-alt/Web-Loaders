
const loaderNames = [
    "Classic Spinner", "Double Ring", "Pulse Dot", "Three Dots", "Bouncing Ball",
    "Wave Bars", "Equalizer", "Growing Circle", "Orbit Rings", "Ripple Effect",
    "Rotating Square", "Flip Card", "Chasing Dots", "Dual Pulse", "Circular Dots",
    "Loading Bar", "Progress Stripes", "Indeterminate Bar", "Gradient Bar", "Shimmer Bar",
    "Typing Dots", "Blinking Text", "Text Wave", "Letter Bounce", "Neon Pulse",
    "Heart Beat", "Star Spin", "Infinity Loop", "Hourglass", "DNA Helix",
    "Orbit Planets", "Solar System", "Atom Orbit", "Radar Sweep", "Signal Rings",
    "Cube Spin", "Isometric Cube", "Folding Cube", "Morphing Blob", "Rotating Diamond",
    "Gradient Ring", "Conic Spinner", "Dashed Circle", "Arc Spinner", "Rainbow Orbit",
    "Skeleton Card", "Skeleton Text", "Skeleton Avatar", "Shimmer Card", "Content Placeholder",
    "Coffee Steam", "Firefly Dots", "Snowfall", "Matrix Rain", "Floating Bubbles",
    "Liquid Wave", "Pendulum", "Spring Motion", "Elastic Dots", "Minimal Loader"
];

const loaderCategories = [
    "Circular", "Circular", "Dots", "Dots", "Bouncing",
    "Bars", "Bars", "Circular", "Circular", "Circular",
    "Geometric", "Geometric", "Dots", "Dots", "Dots",
    "Progress", "Progress", "Progress", "Progress", "Progress",
    "Text", "Text", "Text", "Text", "Text",
    "Creative", "Creative", "Creative", "Creative", "Creative",
    "Creative", "Creative", "Creative", "Creative", "Creative",
    "Geometric", "Geometric", "Geometric", "Geometric", "Geometric",
    "Circular", "Circular", "Circular", "Circular", "Circular",
    "Skeleton", "Skeleton", "Skeleton", "Skeleton", "Skeleton",
    "Creative", "Creative", "Creative", "Creative", "Creative",
    "Creative", "Creative", "Dots", "Dots", "Circular"
];

const loaderDescriptions = [
    "A timeless rotating circle.", "Two rings rotate in opposite directions.",
    "A dot gently pulses.", "Three dots animate in sequence.",
    "A ball bounces continuously.", "Bars rise and fall like a wave.",
    "An animated audio-style equalizer.", "A circle grows and shrinks.",
    "Small dots orbit a central point.", "Expanding rings create a ripple.",
    "A square rotates smoothly.", "A card flips in a loop.",
    "Dots chase each other around a circle.", "Two dots pulse alternately.",
    "Dots light up around a circular path.", "A continuously moving loading bar.",
    "Striped progress animation.", "A sliding indeterminate progress bar.",
    "A flowing gradient loading bar.", "A shimmer sweeps across a bar.",
    "Animated typing indicator.", "Text blinks to indicate activity.",
    "Letters move in a wave.", "Letters bounce in sequence.",
    "A bright neon-style pulse.", "A rhythmic heartbeat animation.",
    "A star rotates continuously.", "A smooth infinity-shaped loop.",
    "An hourglass-inspired loader.", "A twisting double-helix effect.",
    "Planets orbit a central sun.", "A miniature solar system.",
    "An atom-inspired orbital animation.", "A radar sweep rotates around a circle.",
    "Signal rings expand outward.", "A three-dimensional cube spins.",
    "An isometric cube-inspired animation.", "A cube folds and unfolds.",
    "An organic blob changes shape.", "A diamond rotates continuously.",
    "A smooth gradient ring rotates.", "A colorful conic-gradient spinner.",
    "Dashed segments rotate in a circle.", "An arc rotates around a center.",
    "A rainbow-colored orbital spinner.", "A card-shaped skeleton placeholder.",
    "Animated placeholder lines.", "A skeleton avatar placeholder.",
    "A shimmer moves across a card.", "A content placeholder with moving highlights.",
    "Steam-like curls rise upward.", "Tiny fireflies blink and move.",
    "Snowflake-like dots drift downward.", "A falling digital-rain effect.",
    "Bubbles float upward.", "A liquid-inspired wave moves.",
    "A pendulum swings back and forth.", "Spring-like motion with bouncing dots.",
    "Dots stretch and rebound.", "A clean, minimal rotating loader."
];

const loaderTypes = [
    "spinner", "double-ring", "pulse-dot", "three-dots", "bouncing-ball",
    "wave-bars", "equalizer", "growing-circle", "orbit-rings", "ripple",
    "rotating-square", "flip-card", "chasing-dots", "dual-pulse", "circular-dots",
    "loading-bar", "progress-stripes", "indeterminate-bar", "gradient-bar", "shimmer-bar",
    "typing-dots", "blinking-text", "text-wave", "letter-bounce", "neon-pulse",
    "heartbeat", "star-spin", "infinity", "hourglass", "dna",
    "orbit-planets", "solar-system", "atom", "radar", "signal-rings",
    "cube-spin", "isometric-cube", "folding-cube", "blob", "diamond",
    "gradient-ring", "conic-spinner", "dashed-circle", "arc-spinner", "rainbow-orbit",
    "skeleton-card", "skeleton-text", "skeleton-avatar", "skeleton-shimmer", "content-placeholder",
    "coffee-steam", "fireflies", "snowfall", "matrix-rain", "bubbles",
    "liquid-wave", "pendulum", "spring-motion", "elastic-dots", "minimal-loader"
];

const categoryAliases = {
    all: ["Circular", "Dots", "Bouncing", "Bars", "Progress", "Text", "Creative", "Geometric", "Skeleton"],
    spinners: ["Circular"],
    dots: ["Dots"],
    rings: ["Circular"],
    bars: ["Bars", "Progress"],
    shapes: ["Geometric"],
    text: ["Text"],
    skeletons: ["Skeleton"],
    creative: ["Creative"]
};
const loaders = loaderNames.map((name, index) => ({
    id: index + 1,
    name,
    category: loaderCategories[index],
    description: loaderDescriptions[index],
    type: loaderTypes[index]
}));

const state = {
    category: "All",
    search: "",
    favorites: new Set(),
    favoritesOnly: false,
    showAllLoaders: false,
    theme: localStorage.getItem("mcl-theme") || "dark",
    selectedLoader: 1,
    speed: 1,
    size: 64,
    color: "#7c5cff",
    background: "transparent"
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function getElement(...selectors) {
    for (const selector of selectors) {
        const element = $(selector);
        if (element) return element;
    }
    return null;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function getLoaderMarkup(type) {
    const dots = count => Array.from({ length: count }, (_, i) =>
        `<span style="--i:${i}"></span>`
    ).join("");

    const markup = {
        spinner: '<span class="spinner-ring"></span>',
        "double-ring": '<span class="double-ring"><i></i><i></i></span>',
        "pulse-dot": '<span class="pulse-dot"></span>',
        "three-dots": `<span class="three-dots">${dots(3)}</span>`,
        "bouncing-ball": '<span class="bouncing-ball"></span>',
        "wave-bars": `<span class="wave-bars">${dots(5)}</span>`,
        equalizer: `<span class="equalizer">${dots(7)}</span>`,
        "growing-circle": '<span class="growing-circle"></span>',
        "orbit-rings": `<span class="orbit-rings"><i></i>${dots(3)}</span>`,
        ripple: `<span class="ripple-loader"><i></i><i></i></span>`,
        "rotating-square": '<span class="rotating-square"></span>',
        "flip-card": '<span class="flip-card"></span>',
        "chasing-dots": `<span class="chasing-dots">${dots(4)}</span>`,
        "dual-pulse": '<span class="dual-pulse"><i></i><i></i></span>',
        "circular-dots": `<span class="circular-dots">${dots(8)}</span>`,
        "loading-bar": '<span class="loading-bar"><i></i></span>',
        "progress-stripes": '<span class="progress-stripes"></span>',
        "indeterminate-bar": '<span class="indeterminate-bar"><i></i></span>',
        "gradient-bar": '<span class="gradient-bar"></span>',
        "shimmer-bar": '<span class="shimmer-bar"></span>',
        "typing-dots": `<span class="typing-dots">${dots(3)}</span>`,
        "blinking-text": '<span class="blinking-text">Loading</span>',
        "text-wave": '<span class="text-wave">LOADING</span>',
        "letter-bounce": '<span class="letter-bounce">WAIT</span>',
        "neon-pulse": '<span class="neon-pulse"></span>',
        heartbeat: '<span class="heartbeat">♥</span>',
        "star-spin": '<span class="star-spin">★</span>',
        infinity: '<span class="infinity-loader">∞</span>',
        hourglass: '<span class="hourglass-loader">⌛</span>',
        dna: `<span class="dna-loader">${dots(7)}</span>`,
        "orbit-planets": `<span class="orbit-planets"><i></i><b></b></span>`,
        "solar-system": `<span class="solar-system"><i></i><b></b><em></em></span>`,
        atom: `<span class="atom-loader"><i></i><i></i><i></i><b></b></span>`,
        radar: '<span class="radar-loader"><i></i></span>',
        "signal-rings": `<span class="signal-rings">${dots(3)}</span>`,
        "cube-spin": '<span class="cube-spin"></span>',
        "isometric-cube": '<span class="isometric-cube"><i></i><b></b><em></em></span>',
        "folding-cube": `<span class="folding-cube">${dots(4)}</span>`,
        blob: '<span class="blob-loader"></span>',
        diamond: '<span class="diamond-loader"></span>',
        "gradient-ring": '<span class="gradient-ring"></span>',
        "conic-spinner": '<span class="conic-spinner"></span>',
        "dashed-circle": '<span class="dashed-circle"></span>',
        "arc-spinner": '<span class="arc-spinner"></span>',
        "rainbow-orbit": '<span class="rainbow-orbit"><i></i></span>',
        "skeleton-card": '<span class="skeleton-card"><i></i><b></b><em></em></span>',
        "skeleton-text": '<span class="skeleton-text"><i></i><i></i><i></i></span>',
        "skeleton-avatar": '<span class="skeleton-avatar"><i></i><b></b></span>',
        "skeleton-shimmer": '<span class="skeleton-shimmer"></span>',
        "content-placeholder": '<span class="content-placeholder"><i></i><b></b><em></em></span>',
        "coffee-steam": `<span class="coffee-steam"><i></i><i></i><i></i><b></b></span>`,
        fireflies: `<span class="fireflies">${dots(6)}</span>`,
        snowfall: `<span class="snowfall">${dots(8)}</span>`,
        "matrix-rain": `<span class="matrix-rain">${dots(5)}</span>`,
        bubbles: `<span class="bubbles">${dots(5)}</span>`,
        "liquid-wave": '<span class="liquid-wave"><i></i></span>',
        pendulum: '<span class="pendulum"><i></i></span>',
        "spring-motion": `<span class="spring-motion">${dots(3)}</span>`,
        "elastic-dots": `<span class="elastic-dots">${dots(3)}</span>`,
        "minimal-loader": '<span class="minimal-loader"></span>'
    };

    return markup[type] || markup.spinner;
}

function renderLoaderCard(loader) {
    const isFavorite = state.favorites.has(loader.id);
    return `
    <article class="loader-card" data-loader-id="${loader.id}">
      <div class="loader-preview" style="--loader-color:${state.color}">
        <div class="loader-animation loader-${loader.type}">
          ${getLoaderMarkup(loader.type)}
        </div>
      </div>
      <div class="loader-card-info">
        <div class="loader-card-heading">
          <h3 class="loader-card-title">${String(loader.id).padStart(2, "0")}. ${escapeHTML(loader.name)}</h3>
          <button class="favorite-button ${isFavorite ? "is-favorite" : ""}"
            data-action="favorite" data-id="${loader.id}"
            aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
            aria-pressed="${isFavorite}">${isFavorite ? "★" : "☆"}</button>
        </div>
        <p class="loader-card-description">${escapeHTML(loader.description)}</p>
        <span class="loader-category">${escapeHTML(loader.category)}</span>
        <div class="loader-card-actions">
          <button class="button button-secondary" data-action="preview" data-id="${loader.id}">Preview</button>
          <button class="button button-primary" data-action="customize" data-id="${loader.id}">Customize</button>
        </div>
      </div>
    </article>`;
}
function getFilteredLoaders() {
    const query = state.search.trim().toLowerCase();
    const selectedCategories = categoryAliases[state.category.toLowerCase()];

    return loaders.filter(loader => {
        const matchesSearch = !query ||
            loader.name.toLowerCase().includes(query) ||
            loader.description.toLowerCase().includes(query) ||
            loader.category.toLowerCase().includes(query);

        const matchesCategory = !selectedCategories ||
            selectedCategories.includes(loader.category);

        const matchesFavorite =
            !state.favoritesOnly || state.favorites.has(loader.id);

        return matchesSearch && matchesCategory && matchesFavorite;
    });
}
function renderLoaders() {
    const grid = getElement("#loaderGrid", ".loader-grid", "[data-loader-grid]");
    if (!grid) return;

    const filtered = getFilteredLoaders();
    const initialCount = 30;

    const visibleLoaders = state.showAllLoaders
        ? filtered
        : filtered.slice(0, initialCount);

    grid.innerHTML = visibleLoaders.map(renderLoaderCard).join("");

    const count = getElement("#resultCount", ".result-count", "[data-result-count]");
    if (count) {
        count.textContent = `${filtered.length} loader${filtered.length === 1 ? "" : "s"}`;
    }

    const visibleCount = getElement("#visibleCount");
    if (visibleCount) {
        visibleCount.textContent = visibleLoaders.length;
    }

    const total = getElement("#totalLoaders", "[data-total-loaders]");
    if (total) total.textContent = loaders.length;

    const favoritesCount = getElement("#favoritesCount", "#favoriteCount", "[data-favorites-count]");
    if (favoritesCount) favoritesCount.textContent = state.favorites.size;

    const showAllButton = getElement("#showAllLoaders");
    if (showAllButton) {
        showAllButton.textContent = state.showAllLoaders
            ? "Show Less"
            : "Show All Loaders";

        showAllButton.hidden = filtered.length <= initialCount && !state.showAllLoaders;
    }

    const emptyState = getElement("#emptyState");
    if (emptyState) {
        emptyState.hidden = filtered.length !== 0;
    }

    const summary = getElement("#activeFilterSummary");
    if (summary) {
        summary.textContent = state.search || state.category !== "All"
            ? `Showing ${visibleLoaders.length} of ${filtered.length} matching loaders`
            : `Showing ${visibleLoaders.length} of ${filtered.length} animations`;
    }
}
function setTheme(theme) {
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("light-theme", theme === "light");
    document.documentElement.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("mcl-theme", theme);

    const themeButton = getElement("#themeToggle", ".theme-toggle", "[data-theme-toggle]");
    if (themeButton) {
        themeButton.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
        themeButton.setAttribute("aria-pressed", theme === "light");
        themeButton.innerHTML = theme === "dark" ? "☀" : "☾";
    }
}

function showToast(message) {
    let toast = getElement("#toast", ".toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function setCategory(category) {
    const normalizedCategory = category.toLowerCase();

    if (!categoryAliases[normalizedCategory]) return;

    state.category = normalizedCategory === "all"
        ? "All"
        : normalizedCategory;

    state.favoritesOnly = false;
    state.showAllLoaders = false;

    $$("#categoryFilters .filter-chip").forEach(button => {
        const active = button.dataset.category.toLowerCase() === normalizedCategory;

        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    renderLoaders();
}
function toggleFavorite(id) {
    if (state.favorites.has(id)) {
        state.favorites.delete(id);
        showToast("Removed from favorites");
    } else {
        state.favorites.add(id);
        showToast("Added to favorites");
    }

    renderLoaders();
}

function setFavoritesOnly(enabled) {
    state.favoritesOnly = enabled;
    const button = getElement("#favoritesFilter", "[data-favorites-filter]");
    if (button) {
        button.classList.toggle("active", enabled);
        button.setAttribute("aria-pressed", String(enabled));
    }
    renderLoaders();
}

function openMobileMenu() {
    const nav = getElement("#topNav", ".top-nav");
    const toggle = getElement("#menuToggle", ".menu-toggle");
    if (!nav || !toggle) return;

    const isOpen = nav.classList.toggle("active");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

function initializeLoadersPartOne() {
    setTheme(state.theme);
    renderLoaders();
    const showAllButton = getElement("#showAllLoaders");

    if (showAllButton) {
        showAllButton.addEventListener("click", () => {
            state.showAllLoaders = !state.showAllLoaders;
            renderLoaders();
        });
    }



    const search = getElement("#loaderSearch", ".search-box input", "[data-loader-search]");
    if (search) {
        search.addEventListener("input", event => {
            state.search = event.target.value;
            renderLoaders();
        });
    }

    const menuToggle = getElement("#menuToggle", ".menu-toggle");
    if (menuToggle) menuToggle.addEventListener("click", openMobileMenu);

    const themeToggle = getElement("#themeToggle", ".theme-toggle", "[data-theme-toggle]");
    if (themeToggle) {
        themeToggle.addEventListener("click", () =>
            setTheme(state.theme === "dark" ? "light" : "dark")
        );
    }

    const favoritesFilter = getElement("#favoritesFilter", "[data-favorites-filter]");
    if (favoritesFilter) {
        favoritesFilter.addEventListener("click", () =>
            setFavoritesOnly(!state.favoritesOnly)
        );
    }

    const navOthers = getElement(".nav-others");
    const othersTrigger = getElement("#othersToggle", ".others-toggle", "[data-others-toggle]");
    if (navOthers && othersTrigger) {
        othersTrigger.addEventListener("click", event => {
            event.preventDefault();
            const open = navOthers.classList.toggle("open");
            othersTrigger.setAttribute("aria-expanded", String(open));
        });
    }

    document.addEventListener("click", event => {
        const categoryButton = event.target.closest(
            "#categoryFilters .filter-chip"
        );

        if (categoryButton) {
            event.preventDefault();
            setCategory(categoryButton.dataset.category);
        }

        const actionButton = event.target.closest("[data-action]");

        if (actionButton) {
            event.preventDefault();

            const id = Number(actionButton.dataset.id);
            const action = actionButton.dataset.action;

            if (!Number.isFinite(id)) return;

            if (action === "favorite") {
                toggleFavorite(id);
            } else if (action === "preview") {
                openLoaderPreview(id);
            } else if (action === "customize") {
                selectLoaderForStudio(id);
            }
        }

        if (event.target.closest(".top-nav a")) {
            const nav = getElement("#topNav", ".top-nav");
            const toggle = getElement("#menuToggle", ".menu-toggle");
            if (nav) nav.classList.remove("active");
            if (toggle) {
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            }
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const nav = getElement("#topNav", ".top-nav");
            const toggle = getElement("#menuToggle", ".menu-toggle");
            if (nav) nav.classList.remove("active");
            if (toggle) {
                toggle.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
            }
            closeLoaderPreview();
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLoadersPartOne, { once: true });
} else {
    initializeLoadersPartOne();
}

const runtimeAnimationStyles = `
.loader-animation {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 100px;
  color: var(--loader-color, #7c5cff);
}
.loader-animation span,
.loader-animation i,
.loader-animation b,
.loader-animation em {
  box-sizing: border-box;
}
.loader-spinner .spinner-ring,
.spinner-ring {
  width: 46px; height: 46px; border: 4px solid currentColor;
  border-right-color: transparent; border-radius: 50%;
  animation: mcl-spin .8s linear infinite;
}
.double-ring { position: relative; width: 48px; height: 48px; }
.double-ring i { position: absolute; inset: 0; border: 3px solid currentColor; border-radius: 50%; border-left-color: transparent; animation: mcl-spin 1s linear infinite; }
.double-ring i + i { inset: 8px; opacity: .55; animation-direction: reverse; }
.pulse-dot { width: 18px; height: 18px; border-radius: 50%; background: currentColor; animation: mcl-pulse .8s ease-in-out infinite; }
.three-dots,.typing-dots,.elastic-dots,.spring-motion,.wave-bars,.equalizer,.chasing-dots,.circular-dots,.folding-cube,.fireflies,.snowfall,.matrix-rain,.bubbles,.dna-loader { display:flex; align-items:center; justify-content:center; gap:6px; }
.three-dots span,.typing-dots span,.elastic-dots span,.spring-motion span { width:9px; height:9px; background:currentColor; border-radius:50%; animation:mcl-bounce .7s ease-in-out infinite alternate; animation-delay:calc(var(--i)*.12s); }
.bouncing-ball { width:16px; height:16px; border-radius:50%; background:currentColor; animation:mcl-bounce .5s ease-in-out infinite alternate; }
.wave-bars span,.equalizer span { display:block; width:5px; height:28px; border-radius:5px; background:currentColor; animation:mcl-wave .7s ease-in-out infinite alternate; animation-delay:calc(var(--i)*.1s); }
.growing-circle { width:42px; height:42px; border:4px solid currentColor; border-radius:50%; animation:mcl-grow 1s ease-in-out infinite; }
.orbit-rings { position:relative; width:52px; height:52px; border:2px solid currentColor; border-radius:50%; animation:mcl-spin 3s linear infinite; }
.orbit-rings span { position:absolute; top:0; left:50%; width:8px; height:8px; border-radius:50%; background:currentColor; }
.ripple-loader { position:relative; width:54px; height:54px; }
.ripple-loader i { position:absolute; inset:0; border:3px solid currentColor; border-radius:50%; animation:mcl-ripple 1.3s ease-out infinite; }
.ripple-loader i + i { animation-delay:.65s; }
.rotating-square,.flip-card,.diamond-loader { width:34px; height:34px; border:4px solid currentColor; animation:mcl-spin 1.3s ease-in-out infinite; }
.flip-card { animation:mcl-flip 1.2s ease-in-out infinite; }
.chasing-dots { position:relative; width:50px; height:50px; animation:mcl-spin 1.5s linear infinite; }
.chasing-dots span { position:absolute; width:8px; height:8px; background:currentColor; border-radius:50%; top:0; left:50%; transform:rotate(calc(var(--i)*90deg)) translateY(20px); }
.dual-pulse { display:flex; gap:8px; }
.dual-pulse i { width:18px; height:18px; background:currentColor; border-radius:50%; animation:mcl-pulse .8s infinite alternate; }
.dual-pulse i + i { animation-delay:.4s; }
.circular-dots { width:52px; height:52px; position:relative; animation:mcl-spin 1.5s linear infinite; }
.circular-dots span { position:absolute; top:0; left:calc(50% - 4px); width:8px; height:8px; border-radius:50%; background:currentColor; transform:rotate(calc(var(--i)*45deg)) translateY(22px); transform-origin:4px 26px; opacity:calc(.2 + var(--i)*.1); }
.loading-bar,.progress-stripes,.indeterminate-bar,.gradient-bar,.shimmer-bar { position:relative; width:120px; height:8px; overflow:hidden; border-radius:20px; background:color-mix(in srgb,currentColor 18%,transparent); }
.loading-bar i,.indeterminate-bar i { display:block; width:40%; height:100%; border-radius:inherit; background:currentColor; animation:mcl-slide 1.3s ease-in-out infinite; }
.progress-stripes { background:repeating-linear-gradient(45deg,currentColor 0 8px,transparent 8px 16px); animation:mcl-slide 1s linear infinite; }
.gradient-bar { background:linear-gradient(90deg,transparent,currentColor,transparent); background-size:200% 100%; animation:mcl-gradient 1.2s linear infinite; }
.shimmer-bar,.skeleton-shimmer { background:linear-gradient(100deg,transparent 20%,currentColor 50%,transparent 80%); background-size:200% 100%; animation:mcl-gradient 1.4s linear infinite; opacity:.5; }
.blinking-text,.text-wave,.letter-bounce { color:currentColor; font-weight:700; letter-spacing:3px; }
.blinking-text { animation:mcl-blink 1s steps(2) infinite; }
.text-wave span,.letter-bounce span { display:inline-block; animation:mcl-bounce .7s ease-in-out infinite alternate; animation-delay:calc(var(--i)*.08s); }
.neon-pulse { width:35px; height:35px; border:3px solid currentColor; border-radius:50%; box-shadow:0 0 15px currentColor; animation:mcl-pulse 1s infinite; }
.heartbeat { color:currentColor; font-size:48px; animation:mcl-heart .8s ease-in-out infinite; }
.star-spin { color:currentColor; font-size:48px; animation:mcl-spin 2s linear infinite; }
.infinity-loader { font-size:70px; line-height:1; animation:mcl-pulse 1.2s ease-in-out infinite; }
.hourglass-loader { font-size:40px; animation:mcl-flip 1.5s ease-in-out infinite; }
.dna-loader span { width:6px; height:35px; border-radius:6px; background:currentColor; animation:mcl-wave .8s ease-in-out infinite alternate; animation-delay:calc(var(--i)*.1s); }
.orbit-planets,.solar-system,.atom-loader,.radar-loader,.rainbow-orbit { position:relative; width:60px; height:60px; border:1px solid currentColor; border-radius:50%; }
.orbit-planets i,.solar-system i,.solar-system b,.solar-system em,.atom-loader i,.atom-loader b,.radar-loader i,.rainbow-orbit i { position:absolute; width:9px; height:9px; background:currentColor; border-radius:50%; }
.orbit-planets i { top:0; left:50%; animation:mcl-orbit 1.5s linear infinite; }
.orbit-planets b { position:absolute; inset:40%; background:currentColor; border-radius:50%; }
.solar-system i { top:-4px; left:50%; animation:mcl-orbit 2s linear infinite; }
.solar-system b { top:12px; left:0; animation:mcl-orbit 1.4s linear infinite reverse; }
.solar-system em { bottom:0; right:5px; animation:mcl-orbit 2.8s linear infinite; }
.atom-loader { border:none; }
.atom-loader i { width:56px; height:25px; top:17px; left:2px; background:transparent; border:2px solid currentColor; border-radius:50%; animation:mcl-spin 1.2s linear infinite; }
.atom-loader i:nth-child(2) { transform:rotate(60deg); }
.atom-loader i:nth-child(3) { transform:rotate(120deg); }
.atom-loader b { top:26px; left:26px; }
.radar-loader { overflow:hidden; }
.radar-loader i { width:50%; height:50%; right:0; top:0; border-radius:0; background:linear-gradient(45deg,transparent,currentColor); transform-origin:bottom left; animation:mcl-spin 1.2s linear infinite; }
.signal-rings { display:flex; gap:5px; }
.signal-rings span { width:8px; height:35px; border-radius:8px; border:2px solid currentColor; animation:mcl-signal 1s ease-in-out infinite; animation-delay:calc(var(--i)*.2s); }
.cube-spin,.isometric-cube { width:36px; height:36px; border:3px solid currentColor; transform:rotate(45deg); animation:mcl-cube 1.5s linear infinite; }
.isometric-cube { position:relative; }
.isometric-cube i,.isometric-cube b,.isometric-cube em { position:absolute; inset:0; border:2px solid currentColor; }
.isometric-cube i { transform:rotate(30deg); }
.isometric-cube b { transform:rotate(60deg); }
.folding-cube { display:grid; grid-template-columns:repeat(2,15px); gap:4px; transform:rotate(45deg); }
.folding-cube span { width:15px; height:15px; background:currentColor; animation:mcl-pulse .8s infinite alternate; animation-delay:calc(var(--i)*.15s); }
.blob-loader { width:48px; height:48px; background:currentColor; animation:mcl-blob 2s ease-in-out infinite; }
.diamond-loader { transform:rotate(45deg); }
.gradient-ring { width:48px; height:48px; border:5px solid transparent; border-top-color:currentColor; border-right-color:currentColor; border-radius:50%; animation:mcl-spin 1s linear infinite; }
.conic-spinner { width:50px; height:50px; border-radius:50%; background:conic-gradient(transparent,currentColor); mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 0); animation:mcl-spin .8s linear infinite; }
.dashed-circle { width:46px; height:46px; border:4px dashed currentColor; border-radius:50%; animation:mcl-spin 3s linear infinite; }
.arc-spinner { width:46px; height:46px; border:4px solid transparent; border-top-color:currentColor; border-left-color:currentColor; border-radius:50%; animation:mcl-spin .8s linear infinite; }
.rainbow-orbit { border-color:transparent; animation:mcl-spin 2s linear infinite; background:linear-gradient(var(--surface,transparent),var(--surface,transparent)) padding-box,conic-gradient(red,orange,yellow,green,blue,violet,red) border-box; }
.rainbow-orbit i { top:0; left:50%; background:#ff5c8a; }
.skeleton-card,.content-placeholder { display:flex; flex-direction:column; gap:8px; width:110px; }
.skeleton-card i { height:42px; }
.skeleton-card b,.skeleton-card em,.skeleton-text i,.content-placeholder i,.content-placeholder b,.content-placeholder em,.skeleton-avatar i,.skeleton-avatar b { display:block; height:7px; border-radius:5px; background:currentColor; opacity:.2; }
.skeleton-card em,.skeleton-text i:last-child,.content-placeholder em { width:65%; }
.skeleton-text { display:flex; flex-direction:column; gap:8px; width:100px; }
.skeleton-avatar { display:flex; align-items:center; gap:10px; }
.skeleton-avatar i { width:34px; height:34px; border-radius:50%; }
.skeleton-avatar b { width:60px; }
.skeleton-shimmer { width:110px; height:65px; border-radius:10px; }
.content-placeholder i { height:45px; }
.coffee-steam { position:relative; width:42px; height:25px; border-bottom:4px solid currentColor; }
.coffee-steam i { position:absolute; bottom:28px; left:7px; height:20px; border-left:2px solid currentColor; border-radius:50%; animation:mcl-steam 1s ease-in-out infinite; }
.coffee-steam i:nth-child(2) { left:19px; animation-delay:.3s; }
.coffee-steam i:nth-child(3) { left:31px; animation-delay:.6s; }
.fireflies span,.snowfall span,.matrix-rain span,.bubbles span { width:6px; height:6px; border-radius:50%; background:currentColor; animation:mcl-float 1.4s ease-in-out infinite alternate; animation-delay:calc(var(--i)*.15s); }
.snowfall span { animation-name:mcl-snow; animation-duration:2s; }
.matrix-rain span { height:30px; border-radius:4px; animation-name:mcl-snow; }
.bubbles span { width:10px; height:10px; animation-name:mcl-float; }
.liquid-wave { width:50px; height:50px; border:3px solid currentColor; border-radius:50%; overflow:hidden; position:relative; }
.liquid-wave i { position:absolute; width:100px; height:100px; left:-25px; top:20px; background:currentColor; border-radius:40%; animation:mcl-liquid 3s linear infinite; }
.pendulum { width:60px; height:45px; border-top:2px solid currentColor; position:relative; }
.pendulum i { position:absolute; top:0; left:28px; width:3px; height:40px; background:currentColor; transform-origin:top; animation:mcl-pendulum .9s ease-in-out infinite alternate; }
.pendulum i:after { content:""; position:absolute; bottom:-5px; left:-5px; width:13px; height:13px; border-radius:50%; background:currentColor; }
.minimal-loader { width:35px; height:35px; border:3px solid currentColor; border-bottom-color:transparent; border-radius:50%; animation:mcl-spin .7s linear infinite; }
@keyframes mcl-spin { to { transform:rotate(360deg); } }
@keyframes mcl-pulse { to { transform:scale(.65); opacity:.45; } }
@keyframes mcl-bounce { to { transform:translateY(-12px); opacity:.55; } }
@keyframes mcl-wave { to { transform:scaleY(.35); opacity:.5; } }
@keyframes mcl-grow { 50% { transform:scale(.6); opacity:.4; } }
@keyframes mcl-ripple { from { transform:scale(.2); opacity:1; } to { transform:scale(1); opacity:0; } }
@keyframes mcl-flip { 50% { transform:rotateY(180deg); } }
@keyframes mcl-slide { 0% { transform:translateX(-120%); } 100% { transform:translateX(280%); } }
@keyframes mcl-gradient { to { background-position:-200% 0; } }
@keyframes mcl-blink { to { opacity:.2; } }
@keyframes mcl-heart { 50% { transform:scale(1.25); } }
@keyframes mcl-orbit { to { transform:rotate(360deg) translateX(22px) rotate(-360deg); } }
@keyframes mcl-cube { to { transform:rotate(405deg); } }
@keyframes mcl-signal { 50% { transform:scaleY(.35); opacity:.4; } }
@keyframes mcl-blob { 0%,100% { border-radius:50% 40% 60% 35%; transform:rotate(0); } 50% { border-radius:35% 60% 40% 55%; transform:rotate(180deg); } }
@keyframes mcl-steam { to { transform:translateY(-12px) rotate(20deg); opacity:0; } }
@keyframes mcl-float { to { transform:translateY(-12px) scale(.7); opacity:.35; } }
@keyframes mcl-snow { to { transform:translateY(20px); opacity:.15; } }
@keyframes mcl-liquid { to { transform:rotate(360deg); } }
@keyframes mcl-pendulum { to { transform:rotate(35deg); } }
`;

function installRuntimeAnimationStyles() {
    let style = $("#mcl-runtime-animations");
    if (!style) {
        style = document.createElement("style");
        style.id = "mcl-runtime-animations";
        document.head.appendChild(style);
    }
    style.textContent = runtimeAnimationStyles;
}

function ensureModal() {
    let modal = getElement("#loaderModal", ".loader-modal", "[data-loader-modal]");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "loaderModal";
    modal.className = "loader-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button type="button" class="modal-close" data-modal-close aria-label="Close preview">×</button>
      <p class="eyebrow">LOADER PREVIEW</p>
      <h2 id="modalTitle">Loader Preview</h2>
      <div class="modal-loader-stage" id="modalLoaderStage"></div>
      <p id="modalLoaderDescription"></p>
      <div class="modal-actions">
        <button class="button button-secondary" id="modalFavoriteButton">☆ Save favorite</button>
        <button class="button button-primary" id="modalCustomizeButton">Customize loader</button>
      </div>
    </div>`;
    document.body.appendChild(modal);

    modal.addEventListener("click", event => {
        if (event.target.closest("[data-modal-close]")) closeLoaderPreview();
    });

    $("#modalFavoriteButton", modal).addEventListener("click", () => {
        if (state.selectedLoader) toggleFavorite(state.selectedLoader);
        updateModalFavoriteButton();
    });

    $("#modalCustomizeButton", modal).addEventListener("click", () => {
        closeLoaderPreview();
        selectLoaderForStudio(state.selectedLoader);
    });

    return modal;
}

function openLoaderPreview(id) {
    const loader = loaders.find(item => item.id === Number(id));
    if (!loader) return;

    state.selectedLoader = loader.id;
    const modal = ensureModal();
    $("#modalTitle", modal).textContent = loader.name;
    $("#modalLoaderDescription", modal).textContent = loader.description;
    $("#modalLoaderStage", modal).innerHTML = `
    <div class="loader-animation loader-${loader.type}"
      style="--loader-color:${state.color};--loader-size:${state.size}px;--loader-speed:${state.speed}s">
      ${getLoaderMarkup(loader.type)}
    </div>`;
    modal.classList.add("open", "active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    updateModalFavoriteButton();

    const closeButton = $(".modal-close", modal);
    if (closeButton) closeButton.focus();
}

function closeLoaderPreview() {
    const modal = getElement("#loaderModal", ".loader-modal", "[data-loader-modal]");
    if (!modal) return;
    modal.classList.remove("open", "active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function updateModalFavoriteButton() {
    const button = getElement("#modalFavoriteButton");
    if (!button) return;
    const saved = state.favorites.has(state.selectedLoader);
    button.textContent = saved ? "★ Saved to favorites" : "☆ Save favorite";
    button.setAttribute("aria-pressed", String(saved));
}

function getStudioElement(...selectors) {
    return getElement(...selectors);
}

function selectLoaderForStudio(id) {
    const loader = loaders.find(item => item.id === Number(id));

    if (!loader) {
        console.error("Loader not found:", id);
        return;
    }

    state.selectedLoader = loader.id;

    const name = document.getElementById("selectedLoaderName");
    const category = document.getElementById("selectedLoaderCategory");
    const preview = document.getElementById("studioLoader");
    const select = document.getElementById("studioLoaderSelect");
    const status = document.getElementById("previewStatus");
    const showText = document.getElementById("showLoadingText");
    const loadingLabel = document.getElementById("loadingLabel");

    if (name) {
        name.textContent = loader.name;
    }

    if (category) {
        category.textContent = loader.category.toUpperCase();
    }

    if (preview) {
        const caption = showText && showText.checked
            ? `<p class="loader-caption">${escapeHTML(
                loadingLabel?.value || "Loading..."
            )}</p>`
            : "";

        preview.innerHTML = `
            <div class="loader-animation loader-${loader.type}"
                style="
                    --loader-color: ${state.color};
                    --loader-size: ${state.size}px;
                    --loader-speed: ${state.speed}s;
                ">
                ${getLoaderMarkup(loader.type)}
            </div>
            ${caption}
        `;
    }

    if (select) {
        select.value = String(loader.id);
    }

    if (status) {
        status.textContent = `${loader.name} selected`;
    }

    if (typeof updateStudioCode === "function") {
        updateStudioCode();
    }

    const playground = document.getElementById("playground");

    if (playground) {
        playground.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    if (typeof showToast === "function") {
        showToast(`${loader.name} selected`);
    }
}

function updateStudioPreview() {
    const loader = loaders.find(
        item => item.id === state.selectedLoader
    );

    if (!loader) return;

    const preview = document.getElementById("studioLoader");
    const canvas = document.getElementById("studioCanvas");
    const showText = document.getElementById("showLoadingText");
    const loadingLabel = document.getElementById("loadingLabel");
    const pauseAnimation = document.getElementById("pauseAnimation");
    const colorValue = document.getElementById("loaderColorValue");
    const sizeValue = document.getElementById("loaderSizeValue");
    const speedValue = document.getElementById("loaderSpeedValue");
    const background = document.getElementById("canvasBackground");

    if (preview) {
        const caption = showText && showText.checked
            ? `<p class="loader-caption">${escapeHTML(
                loadingLabel?.value || "Loading..."
            )}</p>`
            : "";

        preview.innerHTML = `
            <div class="loader-animation loader-${loader.type}"
                style="
                    --loader-color: ${state.color};
                    --loader-size: ${state.size}px;
                    --loader-speed: ${state.speed}s;
                ">
                ${getLoaderMarkup(loader.type)}
            </div>
            ${caption}
        `;

        if (pauseAnimation && pauseAnimation.checked) {
            preview.querySelectorAll("*").forEach(element => {
                element.style.animationPlayState = "paused";
            });
        }
    }

    if (canvas && background) {
        const backgrounds = {
            auto: "",
            dark: "#11131d",
            light: "#ffffff",
            gradient: "linear-gradient(135deg, #111827, #312e81)",
            transparent: "transparent"
        };

        canvas.style.background = backgrounds[background.value] ?? "";
    }

    if (colorValue) {
        colorValue.textContent = state.color.toUpperCase();
    }

    if (sizeValue) {
        sizeValue.textContent = `${state.size}px`;
    }

    if (speedValue) {
        speedValue.textContent = `${state.speed.toFixed(1)}s`;
    }

    document.querySelectorAll(".loader-preview .loader-animation").forEach(
        element => {
            element.style.setProperty("--loader-color", state.color);
        }
    );

    updateStudioCode();
}

function getExportMarkup(loader) {
    return `<div class="loader-animation loader-${loader.type}" style="--loader-color:${state.color};--loader-size:${state.size}px;--loader-speed:${state.speed}s">${getLoaderMarkup(loader.type)}</div>`;
}

function updateStudioCode() {
    const loader = loaders.find(item => item.id === state.selectedLoader);
    if (!loader) return;

    const htmlCode = getStudioElement("#htmlCode", "#htmlOutput", "[data-html-code]");
    const cssCode = getStudioElement("#cssCode", "#cssOutput", "[data-css-code]");
    const jsCode = getStudioElement("#jsCode", "#jsOutput", "[data-js-code]");

    const html = getExportMarkup(loader);
    const css = `
.loader-animation { display:grid; place-items:center; width:100%; min-height:100px; color:${state.color}; }
.loader-animation span,.loader-animation i,.loader-animation b,.loader-animation em { box-sizing:border-box; }
.loader-${loader.type} { --loader-color:${state.color}; --loader-size:${state.size}px; --loader-speed:${state.speed}s; }
${runtimeAnimationStyles}
`.trim();

    const js = `const loader = document.querySelector(".loader-animation");
loader.style.setProperty("--loader-color", "${state.color}");
loader.style.setProperty("--loader-size", "${state.size}px");
loader.style.setProperty("--loader-speed", "${state.speed}s");`;

    if (htmlCode) htmlCode.textContent = html;
    if (cssCode) cssCode.textContent = css;
    if (jsCode) jsCode.textContent = js;

    const codeOutput = getStudioElement("#codeOutput", ".code-output", "[data-code-output]");
    if (codeOutput) {
        const activeTab = $(".code-tab.active, [data-code-tab].active");
        const tab = activeTab?.dataset.codeTab || activeTab?.dataset.tab || "html";
        codeOutput.textContent = tab === "css" ? css : tab === "js" ? js : html;
    }
}

async function copyText(text, successMessage = "Copied to clipboard") {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const field = document.createElement("textarea");
            field.value = text;
            field.style.position = "fixed";
            field.style.opacity = "0";
            document.body.appendChild(field);
            field.select();
            const successful = document.execCommand("copy");
            field.remove();
            if (!successful) throw new Error("Copy failed");
        }
        showToast(successMessage);
    } catch {
        showToast("Copy failed. Select the code and copy it manually.");
    }
}

function downloadFile(filename, content, type = "text/plain") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`${filename} downloaded`);
}

function getActiveCode() {
    const activeTab = $(".code-tab.active, [data-code-tab].active");
    const tab = activeTab?.dataset.codeTab || activeTab?.dataset.tab || "html";
    const element = tab === "css"
        ? getStudioElement("#cssCode", "#cssOutput", "[data-css-code]")
        : tab === "js"
            ? getStudioElement("#jsCode", "#jsOutput", "[data-js-code]")
            : getStudioElement("#htmlCode", "#htmlOutput", "[data-html-code]");

    if (element?.textContent.trim()) return element.textContent;

    const loader = loaders.find(item => item.id === state.selectedLoader);
    if (!loader) return "";
    return tab === "css"
        ? `.loader-${loader.type} { color: ${state.color}; }`
        : tab === "js"
            ? `document.querySelector(".loader-animation").style.setProperty("--loader-color", "${state.color}");`
            : getExportMarkup(loader);
}

function initializeStudioControls() {
    const speedControl = getStudioElement("#loaderSpeed", "#speedControl", "[data-loader-speed]");
    const sizeControl = getStudioElement("#loaderSize", "#sizeControl", "[data-loader-size]");
    const colorControl = getStudioElement("#loaderColor", "#colorControl", "[data-loader-color]");
    const selectControl = document.getElementById("studioLoaderSelect");
    if (speedControl) {
        speedControl.value = String(state.speed);
        speedControl.addEventListener("input", () => {
            state.speed = Math.max(0.1, (Number(speedControl.value) || 10) / 10);
            updateStudioPreview();
            const output = document.getElementById("loaderSpeedValue");
            if (output) output.textContent = `${state.speed.toFixed(1)}s`;
        });
    }

    if (sizeControl) {
        sizeControl.value = String(state.size);
        sizeControl.addEventListener("input", () => {
            state.size = Math.max(12, Number(sizeControl.value) || 64);
            updateStudioPreview();
            const output = document.getElementById("loaderSizeValue");
            if (output) output.textContent = `${state.size}px`;
        });
    }

    if (colorControl) {
        colorControl.value = state.color;
        colorControl.addEventListener("input", () => {
            state.color = colorControl.value;
            updateStudioPreview();
        });
    }

    if (selectControl) {
        selectControl.innerHTML = loaders.map(loader =>
            `<option value="${loader.id}">${String(loader.id).padStart(2, "0")} — ${escapeHTML(loader.name)}</option>`
        ).join("");
        selectControl.value = String(state.selectedLoader);
        selectControl.addEventListener("change", () => selectLoaderForStudio(Number(selectControl.value)));
    }

    const resetButton = document.getElementById("resetCustomization");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            state.speed = 1;
            state.size = 64;
            state.color = "#7c5cff";
            if (speedControl) speedControl.value = "10";
            if (sizeControl) sizeControl.value = "64";
            if (colorControl) colorControl.value = "#7c5cff";
            updateStudioPreview();
            showToast("Studio settings reset");
        });
    }

    const copyButton = getStudioElement("#copyCode", "[data-copy-code]");
    if (copyButton) copyButton.addEventListener("click", () => copyText(getActiveCode(), "Code copied"));

    const downloadButton = getStudioElement("#downloadCode", "[data-download-code]");
    if (downloadButton) {
        downloadButton.addEventListener("click", () => {
            const loader = loaders.find(item => item.id === state.selectedLoader);
            if (!loader) return;
            const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHTML(loader.name)}</title>
<style>
body{min-height:100vh;margin:0;display:grid;place-items:center;background:#101018}
${runtimeAnimationStyles}
.loader-animation{color:${state.color};--loader-color:${state.color};--loader-size:${state.size}px;--loader-speed:${state.speed}s}
</style>
</head>
<body>${getExportMarkup(loader)}</body>
</html>`;
            downloadFile(`${loader.type}-loader.html`, html, "text/html");
        });
    }

    const saveButton = getStudioElement("#saveLoader", "[data-save-loader]");
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            if (!state.favorites.has(state.selectedLoader)) {
                state.favorites.add(state.selectedLoader);
                renderLoaders();
            }
            showToast("Loader saved to favorites");
        });
    }

    $$(".code-tab, [data-code-tab]").forEach(button => {
        button.addEventListener("click", () => {
            $$(".code-tab, [data-code-tab]").forEach(tab => {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-selected", "true");
            updateStudioCode();
        });
    });
    const viewCodeButton = document.getElementById("openCodeFromStudio");

    if (viewCodeButton) {
        viewCodeButton.addEventListener("click", () => {
            updateStudioCode();

            const codeSection = document.getElementById("code");

            if (codeSection) {
                codeSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
}

function initializeFavoritesPersistence() {
    try {
        const stored = JSON.parse(localStorage.getItem("mcl-favorites") || "[]");
        state.favorites = new Set(stored.map(Number).filter(id =>
            loaders.some(loader => loader.id === id)
        ));
    } catch {
        state.favorites = new Set();
    }

    const originalToggleFavorite = toggleFavorite;
    toggleFavorite = function (id) {
        originalToggleFavorite(id);
        localStorage.setItem("mcl-favorites", JSON.stringify([...state.favorites]));
        updateModalFavoriteButton();
    };

    renderLoaders();
}

function initializeExtraActions() {
    document.addEventListener("click", event => {
        const copyButton = event.target.closest("[data-copy]");
        if (copyButton) {
            const target = $(copyButton.dataset.copy);
            if (target) copyText(target.textContent);
        }

        const downloadButton = event.target.closest("[data-download-loader]");
        if (downloadButton) {
            const id = Number(downloadButton.dataset.downloadLoader);
            const loader = loaders.find(item => item.id === id);
            if (!loader) return;
            state.selectedLoader = id;
            updateStudioCode();
            const html = getExportMarkup(loader);
            downloadFile(`${loader.type}-loader.html`, html, "text/html");
        }

        const jumpButton = event.target.closest("[data-scroll-to]");
        if (jumpButton) {
            const target = $(jumpButton.dataset.scrollTo);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

function initializeLoaderLabPartTwo() {
    installRuntimeAnimationStyles();
    initializeFavoritesPersistence();
    initializeStudioControls();
    initializeExtraActions();

    if (!loaders.some(loader => loader.id === state.selectedLoader)) {
        state.selectedLoader = 1;
    }

    updateStudioPreview();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLoaderLabPartTwo, { once: true });
} else {
    initializeLoaderLabPartTwo();
}

