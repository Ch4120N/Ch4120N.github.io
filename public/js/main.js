(function() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { header.classList.add('scrolled'); }
        else { header.classList.remove('scrolled'); }
    });

    // Typing effect for hero subtitle
    const typedTextEl = document.querySelector('.typed-text');
    const phrases = ['Cybersecurity Architect', 'Penetration Tester', 'Linux Automation Expert', 'Open Source Developer', 'Ethical Hacker', 'Security Researcher'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--; typeSpeed = 50;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++; typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500; }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // Animate Progress Bars on Scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-bar-fill');
                const progress = entry.target.getAttribute('data-progress');
                fill.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillItems.forEach(item => observer.observe(item));

    // --- REPOSITORIES PAGINATION LOGIC ---
    let allRepos = [];
    let currentPage = 1;
    const reposPerPage = 9;

    async function loadRepos() {
        const grid = document.getElementById('repos-grid');
        if (!grid) return;
        try {
            const res = await fetch('https://api.github.com/users/Ch4120N/repos?sort=updated&per_page=100');
            allRepos = (await res.json()).filter(r => !r.fork); // Filter out forks for cleaner view
            renderRepos();
        } catch (e) {
            grid.innerHTML = '<p class="loading-text">Failed to load repositories. Check your internet connection.</p>';
        }
    }

    function renderRepos() {
        const grid = document.getElementById('repos-grid');
        const start = (currentPage - 1) * reposPerPage;
        const end = start + reposPerPage;
        const pageRepos = allRepos.slice(start, end);
        
        grid.innerHTML = '';
        pageRepos.forEach(repo => {
            const langColor = getLanguageColor(repo.language);
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <div class="repo-header">
                    <i class="fas fa-book-bookmark"></i>
                    <h3>${repo.name}</h3>
                </div>
                <p>${repo.description || 'No description provided.'}</p>
                <div class="repo-meta">
                    <span><i class="fas fa-circle" style="color:${langColor}; font-size: 0.7rem;"></i> ${repo.language || 'N/A'}</span>
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="repo-link">View Repository <i class="fas fa-external-link-alt"></i></a>
            `;
            grid.appendChild(card);
        });
        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages || totalPages === 0;
    }

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) { 
            currentPage--; 
            renderRepos(); 
            window.scrollTo({ top: document.getElementById('repositories').offsetTop - 100, behavior: 'smooth' }); 
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(allRepos.length / reposPerPage);
        if (currentPage < totalPages) { 
            currentPage++; 
            renderRepos(); 
            window.scrollTo({ top: document.getElementById('repositories').offsetTop - 100, behavior: 'smooth' }); 
        }
    });

    function getLanguageColor(lang) {
        const colors = { Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Go: '#00ADD8', Ruby: '#701516', PHP: '#4F5D95', Rust: '#dea584', Shell: '#89e051', Dockerfile: '#384d54', Batchfile: '#C1F12E', PowerShell: '#012456' };
        return colors[lang] || '#8b949e';
    }

    loadRepos();

    // --- COPY TO CLIPBOARD LOGIC ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const address = btn.dataset.address;
            try {
                await navigator.clipboard.writeText(address);
                const icon = btn.querySelector('i');
                icon.className = 'fas fa-check';
                btn.style.backgroundColor = 'var(--accent)';
                btn.style.color = '#fff';
                setTimeout(() => {
                    icon.className = 'fas fa-copy';
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });
})();