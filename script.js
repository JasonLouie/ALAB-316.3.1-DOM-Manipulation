// Part 1
const menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

mainEl.classList.add("flex-ctr");

const topMenuEl = document.getElementById("top-menu");

topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

menuLinks.forEach(link => {
    const anchor = document.createElement("a");
    topMenuEl.appendChild(anchor);
    anchor.setAttribute("href", link.href);
    anchor.textContent = link.text;
});

// Part 2

// Step 1: Getting Started (Code refactor/ensuring everything is there)
// Step 2: Adding Additional HTML and CSS (Create nav with id of sub-menu in HTML file and add CSS)


// Step 3: Creating the Submenu
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById("sub-menu");

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = "100%";

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add("flex-around");

// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = "absolute";

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = "0";

// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll("a");

// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener("click", handleTopMenuClick);

// Access h1 from mainEl
const mainElH1 = mainEl.querySelector("h1");

function handleTopMenuClick(e) {
    // The first line of code of the event listener function should call the event object's preventDefault() method.
    e.preventDefault();

    // The second line of code of the function should immediately return if the element clicked was not an <a> element.
    if (e.target.localName != "a") {
        return false;
    } else {
        // Log the content of the <a> to verify the handler is working.
        console.log(e.target.textContent);
        removeAllActiveExcept(e.target); // Remove all active classes from other <a> elements in topMenuLinks except for the target.
        const object = getMenuObjectByName(e.target.textContent); // Get the specific object from the menuLinks array

        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            removeSubmenu();
            if (object.subLinks) {
                buildSubmenu(object.subLinks);
                subMenuEl.style.top = "100%";
            } else { // If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
                mainElH1.textContent = capitalizeFirstLetters(object.text);
            }
        } else {
            subMenuEl.style.top = "0";
        }
    }

    // Creates and appends child elements (anchor elements) for subMenuEl
    function buildSubmenu(subLinks) {
        for (const link of subLinks) {
            const anchorLink = document.createElement("a");
            anchorLink.href = link.href;
            anchorLink.textContent = link.text;
            subMenuEl.appendChild(anchorLink);
        }
    }

    // Returns the object that has object.text === name
    function getMenuObjectByName(name) {
        for (let i = 0; i < menuLinks.length; i++) {
            if (menuLinks[i].text === name) {
                return menuLinks[i];
            }
        }
    }

    // Removes active tag from all anchor elements in the top menu except for the target
    function removeAllActiveExcept(target) {
        topMenuLinks.forEach(menuLink => {
            if (menuLink.textContent != target.textContent) {
                menuLink.classList.remove("active");
            }
        });
    }
}

// Removes child elements (anchor elements) of subMenuEl
function removeSubmenu() {
    const subMenuLinks = subMenuEl.querySelectorAll("a");
    subMenuLinks.forEach(menuLink => {
        subMenuEl.removeChild(menuLink);
        subMenuEl.style.top = "0";
    });
}

// Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener("click", handleSubMenuClick);

function handleSubMenuClick(e) {
    // The first line of code of the event listener function should call the event object's preventDefault() method.
    e.preventDefault();

    // The second line of code within the function should immediately return if the element clicked was not an <a> element.
    if (e.target.localName != "a") {
        return false;
    } else {
        // Log the content of the <a> to verify the handler is working.
        console.log(e.target.textContent);

        // Next, the event listener should set the CSS top property of subMenuEl to 0.
        subMenuEl.style.top = "0";

        // Remove the active class from each <a> element in topMenuLinks.
        removeAllActive();

        // Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
        const subMenuText = e.target.textContent;
        mainElH1.textContent = capitalizeFirstLetters(subMenuText);

        // Remove subMenuEl's anchor elements
        removeSubmenu();
    }

    // Removes active class from all anchor elements in the top menu
    function removeAllActive() {
        topMenuLinks.forEach(menuLink => {
            menuLink.classList.remove("active");
        });
    }
}

// Capitalizes the first letters of each word
function capitalizeFirstLetters(words) {
    const wordArray = words.split(" ");
    for (let i = 0; i < wordArray.length; i++) {
        wordArray[i] = wordArray[i][0].toUpperCase() + wordArray[i].slice(1);
    }
    return wordArray.join(" ")
}