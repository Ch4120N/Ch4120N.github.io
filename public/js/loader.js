(function initLoader() {
    const loader = document.getElementById('loader');
    const bootSeq = document.getElementById('bootSequence');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    if (!loader || !bootSeq) return;
    
    // Skip loader if already shown this session (optional)
    // if (sessionStorage.getItem('loaderShown')) { loader.classList.add('hidden'); return; }
    
    const bootMessages = [
        { status: 'info', msg: 'Initializing Ch4120N Secure Shell...' },
        { status: 'ok', msg: 'Loading kernel modules', path: '/lib/modules/6.1.0-kali' },
        { status: 'ok', msg: 'Mounting encrypted filesystems', path: '/dev/mapper/vault' },
        { status: 'ok', msg: 'Starting network security daemons' },
        { status: 'ok', msg: 'Loading penetration testing frameworks' },
        { status: 'warn', msg: 'Firewall rules applied', path: 'iptables -A INPUT -j DROP' },
        { status: 'ok', msg: 'Connecting to secure network', path: 'tor.onion:443' },
        { status: 'ok', msg: 'Loading exploit database', path: '/usr/share/exploit-db' },
        { status: 'ok', msg: 'Initializing Python environment', path: 'venv/bin/activate' },
        { status: 'ok', msg: 'Starting GitHub API client' },
        { status: 'ok', msg: 'Loading UI components', path: '/var/www/html' },
        { status: 'ok', msg: 'Compiling shaders & animations' },
        { status: 'info', msg: 'Verifying system integrity...', delay: 400 },
        { status: 'ok', msg: 'All systems operational' },
        { status: 'ok', msg: 'Welcome, guest. Access granted.' }
    ];
    
    let currentLine = 0;
    let progress = 0;
    
    function addBootLine() {
        if (currentLine >= bootMessages.length) {
            setTimeout(hideLoader, 600);
            return;
        }
        
        const msg = bootMessages[currentLine];
        const line = document.createElement('div');
        line.className = 'boot-line';
        
        let statusClass = 'status-ok';
        let statusText = '[ OK ]';
        if (msg.status === 'warn') { statusClass = 'status-warn'; statusText = '[WARN]'; }
        if (msg.status === 'info') { statusClass = 'status-info'; statusText = '[INFO]'; }
        
        let html = `<span class="${statusClass}">${statusText}</span><span class="msg">${msg.msg}</span>`;
        if (msg.path) html += ` <span class="path">${msg.path}</span>`;
        
        line.innerHTML = html;
        bootSeq.appendChild(line);
        
        // Update progress
        progress = Math.min(100, Math.round(((currentLine + 1) / bootMessages.length) * 100));
        progressFill.style.width = progress + '%';
        progressPercent.textContent = progress + '%';
        
        currentLine++;
        const delay = msg.delay || 180 + Math.random() * 150;
        setTimeout(addBootLine, delay);
    }
    
    function hideLoader() {
        loader.classList.add('hidden');
        sessionStorage.setItem('loaderShown', 'true');
        setTimeout(() => loader.remove(), 1000);
    }
    
    // Start boot sequence after a brief delay
    setTimeout(addBootLine, 500);
    
    // Safety fallback: hide loader after 8 seconds no matter what
    setTimeout(() => {
        if (!loader.classList.contains('hidden')) hideLoader();
    }, 8000);
})();