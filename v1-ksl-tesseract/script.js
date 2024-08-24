const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

// Start drawing when the mouse or touch starts
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    draw(e);
});

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    draw(e);
}, { passive: true });

// Stop drawing when the mouse or touch ends
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
    ctx.beginPath();
}, { passive: true });

// Draw when the mouse or touch moves
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw, { passive: true });

// Helper function to handle drawing
function draw(event) {
    if (!isDrawing) return;

    // Handle different event types
    let x, y;
    if (event.type === 'mousemove' || event.type === 'mousedown') {
        x = event.clientX - canvas.getBoundingClientRect().left;
        y = event.clientY - canvas.getBoundingClientRect().top;
    } else if (event.type === 'touchmove' || event.type === 'touchstart') {
        const touch = event.touches[0];
        x = touch.clientX - canvas.getBoundingClientRect().left;
        y = touch.clientY - canvas.getBoundingClientRect().top;
    }

    // Draw on the canvas
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

