(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Expose to global for terminal command
    window.setTheme = function(theme) {
        if (theme === 'dark' || theme === 'light') {
            htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            return true;
        }
        return false;
    };
})();