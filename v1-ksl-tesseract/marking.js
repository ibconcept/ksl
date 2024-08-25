const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const submitButton = document.getElementById('submitButton');
const clearButton = document.getElementById('clearButton');
const output = document.getElementById('output');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackText = document.getElementById('feedbackText');

let drawing = false;
let lastX, lastY;

// Drawing logic
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});

// Clear button functionality
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    feedbackIcon.innerHTML = '';
    feedbackText.textContent = 'Draw something above and click submit.';
});

// Submit button functionality with Tesseract OCR
submitButton.addEventListener('click', async () => {
    const imageData = canvas.toDataURL('image/png');

    // Use Tesseract to recognize the text in the image
    Tesseract.recognize(
        imageData,
        'eng',
        { logger: info => console.log(info) } // Optional logging
    ).then(({ data: { text } }) => {
        const recognizedText = text.trim();

        // Example predefined answers
        const predefinedAnswers = ['A', 'B', 'C']; // List of acceptable answers
        const expectedText = 'A'; // Example expected answer

        if (predefinedAnswers.includes(recognizedText)) {
            feedbackIcon.innerHTML = '✔';
            feedbackIcon.className = 'correct';
            feedbackText.textContent = `Correct! You drew: ${recognizedText}`;
        } else {
            feedbackIcon.innerHTML = '✘';
            feedbackIcon.className = 'incorrect';
            feedbackText.textContent = `Incorrect. You drew: ${recognizedText}`;
        }
    }).catch(error => {
        feedbackIcon.innerHTML = '✘';
        feedbackIcon.className = 'incorrect';
        feedbackText.textContent = 'Error processing image.';
        console.error(error);
    });
});
