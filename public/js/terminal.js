(function() {
    const outputEl = document.getElementById('terminal-output');
    const inputEl = document.getElementById('terminal-input');
    const bodyEl = document.getElementById('terminal-body');
    const termWindow = document.getElementById('terminal-window');

    if (!outputEl || !inputEl || !bodyEl || !termWindow) return;

    let commandHistory = [];
    let historyIndex = 0;

    function escapeHtml(text) {
        const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    function print(html) {
        const div = document.createElement('div');
        div.className = 'output-text';
        div.innerHTML = html;
        outputEl.appendChild(div);
        scrollToBottom();
    }

    // Fixed: Proper HTML structure for prompt echo
    function printCommand(cmd) {
        const div = document.createElement('div');
        div.className = 'command-echo';
        div.innerHTML = `
            <div class="prompt-line-1">
                <span class="prompt-symbol">┌──(</span><span class="prompt-user">guest</span><span class="prompt-at">㉿</span><span class="prompt-host">Ch4120N-Box</span><span class="prompt-symbol">)-[</span><span class="prompt-path">~</span><span class="prompt-symbol">]</span>
            </div>
            <div class="prompt-line-2-wrap">
                <span class="prompt-line-2"><span class="prompt-symbol">└─</span><span class="prompt-symbol-root">$</span></span>
                <span class="cmd-text">${escapeHtml(cmd)}</span>
            </div>`;
        outputEl.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() { bodyEl.scrollTop = bodyEl.scrollHeight; }

    function progressBar(percent) {
        return `<span class="term-progress-container"><span class="term-progress-fill" style="width: ${percent}%"></span></span> <span class="highlight">${percent}%</span>`;
    }

    function showWelcome() {
        const banner = `
<pre class="ascii-art">${RESUME_DATA.ascii}</pre>
<div class="term-box">
  <span class="highlight"><i class="fas fa-shield-halved"></i> Welcome to Ch4120N's Interactive Cyber-Resume!</span><br>
  System initialized successfully. Type <span class="highlight">help</span> to view available commands.<br>
  Press <span class="highlight">TAB</span> for auto-completion. Use <span class="highlight">↑/↓</span> for history.
</div>`;
        print(banner);
    }

    function processCommand(input) {
        const cmd = input.trim().toLowerCase();
        const args = cmd.split(' ');
        const command = args[0];

        printCommand(input);
        if (!command) return;

        switch (command) {
            case 'help':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-terminal"></i> AVAILABLE COMMANDS</span>
  <table class="term-table">
    <tr><th>Command</th><th>Description</th></tr>
    <tr><td><span class="highlight">about</span></td><td>Display information about me</td></tr>
    <tr><td><span class="highlight">skills</span></td><td>Show technical skills with mastery levels</td></tr>
    <tr><td><span class="highlight">journey</span> | <span class="highlight">experience</span></td><td>View my professional timeline</td></tr>
    <tr><td><span class="highlight">projects</span></td><td>List featured cybersecurity projects</td></tr>
    <tr><td><span class="highlight">repos</span></td><td>Fetch all GitHub repositories dynamically</td></tr>
    <tr><td><span class="highlight">services</span></td><td>View services and expertise</td></tr>
    <tr><td><span class="highlight">certifications</span></td><td>Display certifications and achievements</td></tr>
    <tr><td><span class="highlight">learning</span></td><td>Currently learning topics with progress</td></tr>
    <tr><td><span class="highlight">goals</span></td><td>Future roadmap and objectives</td></tr>
    <tr><td><span class="highlight">donate</span></td><td>Support my open-source work</td></tr>
    <tr><td><span class="highlight">fun</span></td><td>Random dev quotes and fun facts</td></tr>
    <tr><td><span class="highlight">license</span></td><td>Legal and ethical usage info</td></tr>
    <tr><td><span class="highlight">contact</span></td><td>Get my contact information</td></tr>
    <tr><td><span class="highlight">theme</span> [dark/light]</td><td>Toggle or set UI theme</td></tr>
    <tr><td><span class="highlight">clear</span></td><td>Clear the terminal screen</td></tr>
    <tr><td><span class="highlight">whoami</span> | <span class="highlight">sudo</span> | <span class="highlight">exit</span></td><td>System commands (Try them!)</td></tr>
  </table>
</div>`);
                break;

            case 'about':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-user-astronaut"></i> ABOUT ME</span><br><br>
  <i class="fas fa-shield-halved"></i> Cybersecurity Expert & Penetration Tester<br>
  <i class="fas fa-bolt"></i> Linux Server Automation & Hardening Specialist<br>
  <i class="fas fa-robot"></i> Custom Security Tools & Bot Developer<br>
  <i class="fas fa-code-branch"></i> Open Source Contributor & Security Researcher<br><br>
  Ch4120N - A passionate security-driven technologist specializing in ethical hacking, penetration testing, and building robust cybersecurity solutions.
</div>`);
                break;

            case 'skills':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-layer-group"></i> TECHNICAL SKILLS & MASTERY</span><br><br>
  <table class="term-table">
    <tr><th>Skill Category</th><th>Proficiency</th></tr>
    <tr><td><i class="devicon-python-plain colored"></i> Python & Automation</td><td>${progressBar(95)}</td></tr>
    <tr><td><i class="devicon-linux-plain colored"></i> Linux Administration</td><td>${progressBar(90)}</td></tr>
    <tr><td><i class="fas fa-user-secret"></i> Penetration Testing</td><td>${progressBar(88)}</td></tr>
    <tr><td><i class="fas fa-globe"></i> Web Exploitation</td><td>${progressBar(90)}</td></tr>
    <tr><td><i class="fas fa-network-wired"></i> Network Security</td><td>${progressBar(85)}</td></tr>
    <tr><td><i class="fas fa-code"></i> Reverse Engineering</td><td>${progressBar(75)}</td></tr>
  </table>
</div>`);
                break;

            case 'journey': case 'experience':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-briefcase"></i> PROFESSIONAL JOURNEY</span><br><br>
  <span class="highlight">[2023 - Present]</span> Freelance Cybersecurity Consultant<br>
  <i>Providing penetration testing, security audits, and automation solutions.</i><br><br>
  <span class="highlight">[2021 - 2023]</span> Open Source Security Developer<br>
  <i>Developing tools like Charon SMS Bomber, MD5 Cracker, and SSH Kracker.</i><br><br>
  <span class="highlight">[2019 - 2021]</span> Linux System Administrator<br>
  <i>Managing, hardening, and automating Linux servers and infrastructure.</i>
</div>`);
                break;

            case 'projects':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-rocket"></i> FEATURED PROJECTS</span><br><br>
  <table class="term-table">
    <tr><th>Project</th><th>Description</th><th>Link</th></tr>
    <tr><td><i class="fas fa-bomb"></i> Charon SMS Bomber</td><td>Powerful Iranian SMS Testing Tool</td><td><a href="https://github.com/Ch4120N/Charon-SMS-Bomber" target="_blank" class="link">View</a></td></tr>
    <tr><td><i class="fas fa-network-wired"></i> Charon DNS Changer</td><td>Fast DNS Configuration Tool</td><td><a href="https://github.com/Ch4120N/Charon-DNS-Changer-V1.0" target="_blank" class="link">View</a></td></tr>
    <tr><td><i class="fas fa-lock-open"></i> MD5 Hash Cracker</td><td>Fastest MD5 Brute Force Tool</td><td><a href="https://github.com/Ch4120N/Charon-MD5-Hash-Cracker" target="_blank" class="link">View</a></td></tr>
    <tr><td><i class="fas fa-terminal"></i> ChSSHKracker</td><td>Multi-Threaded SSH Brute Force</td><td><a href="https://github.com/Ch4120N/ChSSHKracker" target="_blank" class="link">View</a></td></tr>
  </table>
</div>`);
                break;

            case 'repos':
                print(`<span class="highlight"><i class="fas fa-sync fa-spin"></i> Fetching repositories from GitHub API...</span>`);
                fetch('https://api.github.com/users/Ch4120N/repos?sort=updated&per_page=100')
                    .then(res => res.json())
                    .then(repos => {
                        if (repos.message) { print(`Error: ${repos.message}`); return; }
                        let html = `<div class="term-box"><span class="highlight"><i class="fas fa-book"></i> PUBLIC REPOSITORIES (${repos.filter(r=>!r.fork).length})</span><br><br>`;
                        repos.filter(r => !r.fork).slice(0, 10).forEach(repo => {
                            html += `<i class="fas fa-folder"></i> <span class="highlight">${repo.name}</span><br>  ${repo.description || 'No description'}<br>  <i class="fas fa-star"></i> ${repo.stargazers_count} | <i class="fas fa-code-branch"></i> ${repo.forks_count} | <a href="${repo.html_url}" target="_blank" class="link">Open</a><br><br>`;
                        });
                        html += `<i>Showing top 10. Visit GitHub for full list.</i></div>`;
                        // Replace the loading message
                        outputEl.lastChild.innerHTML = html;
                        scrollToBottom();
                    })
                    .catch(() => {
                        outputEl.lastChild.innerHTML = `<span style="color:red">Failed to fetch repositories.</span>`;
                        scrollToBottom();
                    });
                break;

            case 'services':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-cogs"></i> SERVICES & EXPERTISE</span><br><br>
  <span class="highlight"><i class="fas fa-shield-halved"></i> Cybersecurity:</span> Penetration Testing, Vulnerability Assessment, Security Audits, Bug Bounty.<br><br>
  <span class="highlight"><i class="fas fa-bolt"></i> Automation:</span> Linux Server Automation, System Hardening, DevOps Solutions, CI/CD.<br><br>
  <span class="highlight"><i class="fas fa-robot"></i> Development:</span> Custom Security Tools, Telegram Bots, API Integrations, Full-Stack.<br><br>
  <span class="highlight"><i class="fas fa-handshake"></i> Consulting:</span> Code Review, Technical Consulting, Security Mentoring.
</div>`);
                break;

            case 'certifications':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-trophy"></i> CERTIFICATIONS & ACHIEVEMENTS</span><br><br>
  <span class="term-badge">OSCP (In Progress)</span> <span class="term-badge">PWK (Completed)</span><br>
  <span class="term-badge">CEH Certified</span> <span class="term-badge">HTB Pro Hacker</span> <span class="term-badge">Top 10% CTF</span>
</div>`);
                break;

            case 'learning':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-brain"></i> CURRENTLY LEARNING</span><br><br>
  <table class="term-table">
    <tr><th>Topic</th><th>Progress</th></tr>
    <tr><td><i class="fas fa-flask"></i> OSCP</td><td>${progressBar(60)}</td></tr>
    <tr><td><i class="fas fa-brain"></i> AI & ML for Security</td><td>${progressBar(30)}</td></tr>
    <tr><td><i class="fas fa-cloud"></i> Cloud Security</td><td>${progressBar(45)}</td></tr>
    <tr><td><i class="fas fa-dharmachakra"></i> Kubernetes</td><td>${progressBar(20)}</td></tr>
  </table>
</div>`);
                break;

            case 'goals':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-map-signs"></i> GOALS & ROADMAP</span><br><br>
  <i class="fas fa-rocket"></i> <span class="highlight">Automation Excellence:</span> Build comprehensive automation solutions.<br>
  <i class="fas fa-graduation-cap"></i> <span class="highlight">Advanced Training:</span> Master AI & ML for cybersecurity.<br>
  <i class="fas fa-seedling"></i> <span class="highlight">Community:</span> Mentor and support open-source community.<br>
  <i class="fas fa-mask"></i> <span class="highlight">Privacy-First:</span> Contribute to privacy-focused tools.
</div>`);
                break;

            case 'donate':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-heart"></i> SUPPORT MY WORK</span><br><br>
  <span class="highlight">BTC:</span> <code>bc1ql4syps7qpa3djqrxwht3g66tldyh4j7qsyjkq0</code><br>
  <span class="highlight">ETH:</span> <code>0xfddbd535a4ad28792cbebceee3d6982d774e6d13</code><br>
  <span class="highlight">USDT:</span> <code>3Cq6HRQsiwZFmPEQfG9eJkZE2QGChvf2VN</code><br><br>
  <i class="fas fa-flag"></i> <span class="highlight">Iranian Supporters:</span> <a href="https://daramet.com/Ch4120N" target="_blank" class="link">Donate via Daramet</a>
</div>`);
                break;

            case 'fun':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-quote-left"></i> FUN FACTS & QUOTES</span><br><br>
  <i>"The quieter you become, the more you are able to hear."</i> - Altaïr Ibn-La'Ahad<br><br>
  <span class="highlight">Bash:</span><br>
  $ sudo ./coffee.sh<br>
  # Caffeine boost initialized! ☕<br><br>
  <i class="devicon-linux-plain colored"></i> Linux is my OS of choice for security research.
</div>`);
                break;

            case 'license':
                print(`
<div class="term-box" style="border-left-color: #ffbd2e;">
  <span style="color:#ffbd2e"><i class="fas fa-exclamation-triangle"></i> LICENSE & ETHICS</span><br><br>
  <span class="highlight">License:</span> MIT/CGBL<br>
  <span class="highlight">Ethics:</span> Tools are strictly for authorized penetration testing, security research, and educational purposes only. Unauthorized use is prohibited.
</div>`);
                break;

            case 'contact':
                print(`
<div class="term-box">
  <span class="highlight"><i class="fas fa-address-book"></i> CONTACT INFORMATION</span><br><br>
  <i class="fas fa-envelope"></i> Email:    <a href="mailto:Ch4120N@Proton.me" class="link">Ch4120N@Proton.me</a><br>
  <i class="fab fa-github"></i> GitHub:   <a href="https://github.com/Ch4120N" target="_blank" class="link">github.com/Ch4120N</a><br>
  <i class="fab fa-telegram"></i> Telegram: <a href="https://t.me/Ch4120N" target="_blank" class="link">t.me/Ch4120N</a><br>
  <i class="fas fa-bullhorn"></i> Channel:  <a href="https://t.me/Ch4120N_HackerZone" target="_blank" class="link">t.me/Ch4120N_HackerZone</a>
</div>`);
                break;

            case 'resume':
                print(`<pre class="ascii-art">${RESUME_DATA.ascii}</pre>`);
                print(`<div class="term-box">Cybersecurity Expert & Penetration Tester. CEH Certified, OSCP in progress. Building the future of cybersecurity.</div>`);
                break;

            case 'theme':
                if (args[1]) {
                    if (window.setTheme(args[1])) print(`<span class="highlight">[+]</span> Theme changed to <span class="highlight">${args[1]}</span>.`);
                    else print(`<span style="color:red">[-]</span> Invalid theme. Use 'dark' or 'light'.`);
                } else { print(`Current theme is <span class="highlight">${document.documentElement.getAttribute('data-theme')}</span>.`); }
                break;

            case 'clear': outputEl.innerHTML = ''; return;
            case 'whoami': print(`guest`); break;
            case 'sudo': print(`<span style="color:red">[sudo]</span> password for guest: <br>Nice try! But you don't have root privileges here. <i class="fas fa-smile-wink"></i>`); break;
            case 'exit': print(`Connection closed. Just kidding, you can't exit the matrix. <i class="fas fa-glasses"></i>`); break;
            
            default: 
                print(`<span style="color:red">bash: ${escapeHtml(command)}: command not found</span>. Type <span class="highlight">help</span> for available commands.`); 
                break;
        }
    }

    // Quick Commands
    document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
        btn.addEventListener('click', () => { processCommand(btn.dataset.cmd); inputEl.focus(); });
    });

    // Input Handling & TAB Completion
    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const input = inputEl.value;
            const parts = input.split(' ');
            const lastWord = parts[parts.length - 1].toLowerCase();
            let matches = [];
            const commands = ['help', 'about', 'skills', 'mastery', 'journey', 'projects', 'repos', 'services', 'certifications', 'experience', 'learning', 'goals', 'donate', 'fun', 'license', 'contact', 'resume', 'theme', 'clear', 'whoami', 'sudo', 'exit'];
            
            if (parts.length === 1 || (parts.length === 2 && parts[1] === '')) matches = commands.filter(cmd => cmd.startsWith(lastWord));
            else if (parts[0].toLowerCase() === 'theme') matches = ['dark', 'light'].filter(t => t.startsWith(lastWord));

            if (matches.length === 1) { parts[parts.length - 1] = matches[0]; inputEl.value = parts.join(' ') + (parts.length === 1 ? ' ' : ''); }
            else if (matches.length > 1) print(`<span class="highlight">${matches.join(', ')}</span>`);
            return;
        }

        if (e.key === 'Enter') {
            const value = inputEl.value;
            if (value.trim()) {
                commandHistory.push(value);
                historyIndex = commandHistory.length; // Fixed: Reset index to end of array
            }
            processCommand(value);
            inputEl.value = '';
        } 
        // Fixed: Arrow Up/Down History Logic
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                inputEl.value = commandHistory[historyIndex];
            }
        } 
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputEl.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputEl.value = '';
            }
        }
    });

    termWindow.addEventListener('click', () => { inputEl.focus(); });
    showWelcome();
})();