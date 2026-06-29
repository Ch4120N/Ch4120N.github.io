(function() {
    const outputEl = document.getElementById('terminal-output');
    const inputEl = document.getElementById('terminal-input');
    const bodyEl = document.getElementById('terminal-body');
    const termWindow = document.getElementById('terminal-window');

    let commandHistory = [];
    let historyIndex = -1;

    function escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function printToTerminal(html, className = '') {
        const div = document.createElement('div');
        div.className = `output-text ${className}`;
        div.innerHTML = html;
        outputEl.appendChild(div);
        scrollToBottom();
    }

    function printCommand(cmd) {
        const div = document.createElement('div');
        div.className = 'command-echo';
        div.innerHTML = `<span class="prompt-echo">guest@ch4120n-resume:~$</span> ${escapeHtml(cmd)}`;
        outputEl.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() { bodyEl.scrollTop = bodyEl.scrollHeight; }
    function clearTerminal() { outputEl.innerHTML = ''; }

    function showWelcome() {
        const welcomeMsg = `
Welcome to Ch4120N's Interactive Resume! 🚀
Type <span class="highlight">help</span> to see available commands.
        `;
        printToTerminal(welcomeMsg.trim());
    }

    function processCommand(input) {
        const cmd = input.trim().toLowerCase();
        const args = cmd.split(' ');
        const command = args[0];

        printCommand(input);
        if (!command) return;

        switch (command) {
            case 'help':
                printToTerminal(`
<span class="highlight">Available Commands:</span>
  <span class="highlight">about</span>        - Learn about me
  <span class="highlight">skills</span>       - View my technical skills
  <span class="highlight">projects</span>     - See my featured projects
  <span class="highlight">certifications</span> - View my certifications
  <span class="highlight">services</span>     - See what I can do for you
  <span class="highlight">contact</span>      - Get my contact information
  <span class="highlight">resume</span>       - Display a special ASCII resume
  <span class="highlight">theme</span> [dark/light] - Toggle or set theme
  <span class="highlight">clear</span>        - Clear the terminal
  <span class="highlight">whoami</span>       - Display current user
  <span class="highlight">sudo</span>         - Try to get root access
  <span class="highlight">exit</span>         - Exit the terminal (just kidding)
                `);
                break;

            case 'about': printToTerminal(RESUME_DATA.about); break;

            case 'skills':
                let skillsHtml = '<span class="highlight">🛠️ Technical Skills:</span>\n\n';
                for (const [category, skills] of Object.entries(RESUME_DATA.skills)) {
                    skillsHtml += `<span class="highlight">${category}</span>\n  ${skills.join(', ')}\n\n`;
                }
                printToTerminal(skillsHtml.trim());
                break;

            case 'projects':
                let projectsHtml = '<span class="highlight">🚀 Featured Projects:</span>\n\n';
                RESUME_DATA.projects.forEach(p => {
                    projectsHtml += `<span class="highlight">🔥 ${p.name}</span>\n  ${p.desc}\n  <a href="${p.link}" target="_blank" class="link">${p.link}</a>\n\n`;
                });
                printToTerminal(projectsHtml.trim());
                break;

            case 'certifications':
            case 'certs':
                let certsHtml = '<span class="highlight">🏆 Certifications & Achievements:</span>\n\n';
                RESUME_DATA.certifications.forEach(c => { certsHtml += `  ${c}\n`; });
                printToTerminal(certsHtml.trim());
                break;

            case 'services':
                let servicesHtml = '<span class="highlight">💼 Services & Expertise:</span>\n\n';
                RESUME_DATA.services.forEach(s => { servicesHtml += `  ${s}\n`; });
                printToTerminal(servicesHtml.trim());
                break;

            case 'contact':
                printToTerminal(`
<span class="highlight">📬 Contact Information:</span>
  📧 Email:    <a href="mailto:${RESUME_DATA.contact.email}" class="link">${RESUME_DATA.contact.email}</a>
  💻 GitHub:   <a href="${RESUME_DATA.contact.github}" target="_blank" class="link">${RESUME_DATA.contact.github}</a>
  ✈️ Telegram: <a href="${RESUME_DATA.contact.telegram}" target="_blank" class="link">${RESUME_DATA.contact.telegram}</a>
                `);
                break;

            case 'resume':
                printToTerminal(`<pre class="ascii-art">${RESUME_DATA.ascii}</pre>`);
                printToTerminal(`
<span class="highlight">📄 Full Resume Summary:</span>
Cybersecurity Expert & Penetration Tester with extensive experience in ethical hacking, Linux automation, and open-source development. 
Proficient in multiple programming languages and frameworks, with a strong focus on building secure, automated, and privacy-first solutions.
Certified in CEH, currently pursuing OSCP. Active in the CTF community (HackTheBox Pro Hacker, Top 10% CTF).
                `);
                break;

            case 'theme':
                if (args[1]) {
                    if (window.setTheme(args[1])) {
                        printToTerminal(`Theme changed to <span class="highlight">${args[1]}</span>.`);
                    } else {
                        printToTerminal(`Invalid theme. Use <span class="highlight">theme dark</span> or <span class="highlight">theme light</span>.`);
                    }
                } else {
                    const current = document.documentElement.getAttribute('data-theme');
                    printToTerminal(`Current theme is <span class="highlight">${current}</span>. Use <span class="highlight">theme [dark/light]</span> to change.`);
                }
                break;

            case 'clear': clearTerminal(); return;
            case 'whoami': printToTerminal('guest'); break;
            case 'sudo':
                printToTerminal(`
[sudo] password for guest: 
Nice try! But you don't have root privileges here. 😉
Only Ch4120N has root access to this system.
                `);
                break;
            case 'exit': printToTerminal("You can't exit the matrix... 🕶️"); break;

            default:
                printToTerminal(`Command not found: <span class="highlight">${command}</span>. Type <span class="highlight">help</span> to see available commands.`);
                break;
        }
    }

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const value = inputEl.value;
            if (value.trim()) {
                commandHistory.push(value);
                historyIndex = commandHistory.length;
            }
            processCommand(value);
            inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) { historyIndex--; inputEl.value = commandHistory[historyIndex]; }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) { historyIndex++; inputEl.value = commandHistory[historyIndex]; }
            else { historyIndex = commandHistory.length; inputEl.value = ''; }
        }
    });

    termWindow.addEventListener('click', () => { inputEl.focus(); });
    showWelcome();
    inputEl.focus();
})();