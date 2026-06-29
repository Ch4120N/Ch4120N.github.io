(function() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function animateOutline() {
        // Lerp (Linear Interpolation) for smooth following
        const speed = 0.15;
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    
    animateOutline();

    
})();