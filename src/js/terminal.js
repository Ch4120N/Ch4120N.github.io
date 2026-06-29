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

    
})();