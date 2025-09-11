// Part 1
const menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
];

const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.background = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach(link => {
    const anchor = document.createElement("a");
    topMenuEl.appendChild(anchor);
    anchor.setAttribute("href", link.href);
    anchor.textContent = link.text;
});

// Part 2

// Step 1 (Code refactor/ensuring everything is there)

// Step 2 (Create nav with id of sub-menu add CSS):

// Step 3 