(function() {
    // === MOBILE HAMBURGER MENU ===
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Close menu when a link is clicked
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        // Close menu if clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { header.classList.add('scrolled'); }
        else { header.classList.remove('scrolled'); }
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { backToTop.classList.add('visible'); }
        else { backToTop.classList.remove('visible'); }
    });
    backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Typing effect
    const typedTextEl = document.querySelector('.typed-text');
    const phrases = ['Cybersecurity Architect', 'Penetration Tester', 'Linux Automation Expert', 'Open Source Developer', 'Ethical Hacker', 'Security Researcher'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) { typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1); charIndex--; typeSpeed = 50; }
        else { typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1); charIndex++; typeSpeed = 100; }
        if (!isDeleting && charIndex === currentPhrase.length) { isDeleting = true; typeSpeed = 2000; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typeSpeed = 500; }
        setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);

    // Animate Progress Bars on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Core Skills & Learning Bars
                const fill = entry.target.querySelector('.progress-bar-fill, .learning-progress-fill');
                if (fill) {
                    // Checks parent for 'data-progress' (Skills), then checks the fill itself for 'data-width' or 'data-progress' (Learning)
                    const progress = entry.target.getAttribute('data-progress') || fill.getAttribute('data-width') || fill.getAttribute('data-progress');
                    if (progress) fill.style.width = `${progress}%`;
                }
                
                // 2. Tech Category Header Bars
                const techCatFill = entry.target.querySelector('.tech-category > .tech-progress-container > .tech-progress-fill');
                if (techCatFill) {
                    const width = techCatFill.getAttribute('data-width');
                    if (width) techCatFill.style.width = `${width}%`;
                }

                // 3. Individual Tech Item Card Bars
                const techItemFill = entry.target.querySelector('.tech-progress .tech-progress-fill');
                if (techItemFill) {
                    const progress = techItemFill.getAttribute('data-progress');
                    if (progress) techItemFill.style.width = `${progress}%`;
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-item, .learning-card, .tech-category, .tech-item-card').forEach(item => observer.observe(item));

    // Staggered Tech Icons Animation
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
    });

    // Repositories Pagination
    let allRepos = [], currentPage = 1;
    const reposPerPage = 9;
    async function loadRepos() {
        const grid = document.getElementById('repos-grid');
        if (!grid) return;
        try {
            const res = await fetch('https://api.github.com/users/Ch4120N/repos?sort=updated&per_page=100');
            allRepos = (await res.json()).filter(r => !r.fork);
            renderRepos();
        } catch (e) { grid.innerHTML = '<p class="loading-text">Failed to load repositories.</p>'; }
    }
    function renderRepos() {
        const grid = document.getElementById('repos-grid');
        const start = (currentPage - 1) * reposPerPage;
        const pageRepos = allRepos.slice(start, start + reposPerPage);
        grid.innerHTML = '';
        pageRepos.forEach(repo => {
            const langColor = getLanguageColor(repo.language);
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <div class="repo-header"><i class="fas fa-book-bookmark"></i><h3>${repo.name}</h3></div>
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
    document.getElementById('prev-page').addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderRepos(); window.scrollTo({ top: document.getElementById('repositories').offsetTop - 100, behavior: 'smooth' }); } });
    document.getElementById('next-page').addEventListener('click', () => { const totalPages = Math.ceil(allRepos.length / reposPerPage); if (currentPage < totalPages) { currentPage++; renderRepos(); window.scrollTo({ top: document.getElementById('repositories').offsetTop - 100, behavior: 'smooth' }); } });
    function getLanguageColor(lang) {
        const colors = { Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600', Go: '#00ADD8', Ruby: '#701516', PHP: '#4F5D95', Rust: '#dea584', Shell: '#89e051' };
        return colors[lang] || '#8b949e';
    }
    loadRepos();

    // Copy to Clipboard
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.address);
                const icon = btn.querySelector('i');
                icon.className = 'fas fa-check'; btn.style.backgroundColor = 'var(--accent)'; btn.style.color = '#fff';
                setTimeout(() => { icon.className = 'fas fa-copy'; btn.style.backgroundColor = ''; btn.style.color = ''; }, 2000);
            } catch (err) { console.error('Failed to copy: ', err); }
        });
    });

    // Random Quotes Rotation
    const quotes = [
        { text: "The quieter you become, the more you are able to hear.", author: "Altaïr Ibn-La'Ahad" },
        { text: "There is no patch for human stupidity.", author: "Ch4120N" },
        { text: "Any sufficiently advanced technology is equivalent to magic.", author: "Arthur C. Clarke" },
        { text: "Hackers are breaking the systems for profit. Before, it was for intellectual challenge.", author: "Kevin Mitnick" },
        { text: "It is not enough for a programmer to be skilled; they must also be ethical.", author: "Ch4120N" },
        { text: "Security is always excessive until it's not enough.", author: "Robbie Sinclair" }
    ];
    let quoteIndex = 0;
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    setInterval(() => {
        quoteText.style.opacity = 0; quoteAuthor.style.opacity = 0;
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.textContent = `"${quotes[quoteIndex].text}"`;
            quoteAuthor.textContent = `- ${quotes[quoteIndex].author}`;
            quoteText.style.opacity = 1; quoteAuthor.style.opacity = 1;
        }, 500);
    }, 8000);

    const canvas = document.getElementById('global-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resizeCanvas() {
            // Use window dimensions to cover the whole screen
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles(); // Reinitialize on resize to fill new space
        });

        const observer = new MutationObserver(() => initParticles());
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        function initParticles() {
            particles = [];
            const isMobile = window.innerWidth < 768;
            // Reduce particle count by 60% on mobile for performance
            const density = isMobile ? 35000 : 15000; 
            const count = Math.floor((canvas.width * canvas.height) / density);
            
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * (isMobile ? 1.5 : 2) + 1
                });
            }
        }
        initParticles();

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const rgb = isDark ? '255, 0, 0' : '100, 100, 100'; 

            // Draw particles
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath(); 
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, 0.5)`; 
                ctx.fill();
            });

            // Draw connection lines (FIXED: Added lineWidth)
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x; 
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${rgb}, ${0.3 * (1 - dist / 120)})`;
                        ctx.lineWidth = 1; // THIS WAS MISSING
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- ANIMATED BLACK TERMINAL FAVICON ---
    (function initAnimatedFavicon() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const link = document.getElementById('dynamic-favicon');
        
        if (!link || !ctx) return;

        let cursorOn = true;

        function drawFavicon() {
            // 1. Background (Solid Black)
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 64, 64);

            // 2. Draw "#" Prompt (Classic Terminal Green)
            ctx.fillStyle = '#00FF00'; 
            ctx.font = 'bold 28px monospace';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', 8, 34); 

            // 3. Draw the Blinking Block Cursor (White)
            if (cursorOn) {
                ctx.fillStyle = '#FFFFFF'; 
                // Positioned perfectly next to the '#' prompt
                ctx.fillRect(32, 18, 12, 28); 
            }

            // 4. Convert Canvas to Image and update the <link> tag
            link.href = canvas.toDataURL('image/png');
        }

        function animateFavicon() {
            cursorOn = !cursorOn; // Toggle cursor visibility
            drawFavicon();
        }

        // Initial draw
        drawFavicon();
        
        // Blink every 500ms (standard real-time cursor blink rate)
        setInterval(animateFavicon, 500);
    })();

    // --- MOST USED LANGUAGES HOVER EFFECT ---
    const sliderContainer = document.getElementById('langSlider');
    if (sliderContainer) {
        const segments = sliderContainer.querySelectorAll('.lang-segment');
        const labels = sliderContainer.querySelectorAll('.lang-label');
        
        function activateLang(lang) {
            sliderContainer.classList.add('dimmed');
            segments.forEach(seg => seg.classList.toggle('active', seg.dataset.lang === lang));
            labels.forEach(lbl => lbl.classList.toggle('active', lbl.dataset.lang === lang));
        }
        
        function deactivateLang() {
            sliderContainer.classList.remove('dimmed');
            segments.forEach(seg => seg.classList.remove('active'));
            labels.forEach(lbl => lbl.classList.remove('active'));
        }
        
        // Bind events to both slider segments and bottom labels
        [...segments, ...labels].forEach(el => {
            el.addEventListener('mouseenter', () => activateLang(el.dataset.lang));
            el.addEventListener('mouseleave', deactivateLang);
        });
    }
})();