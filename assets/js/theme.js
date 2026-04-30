const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement;

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    if (currentTheme === 'dark') {
        if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = body.getAttribute('data-theme');
        if (theme === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    });
}
