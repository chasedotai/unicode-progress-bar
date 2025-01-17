const progressSlider = document.getElementById('progressSlider');
const percentageDisplay = document.getElementById('percentageDisplay');
const progressBar = document.getElementById('progressBar');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');

// Twitter-friendly Unicode characters
const LEFT_CAP = '【';
const RIGHT_CAP = '】';
const EMPTY = '　';  // Unicode full-width space
const FULL = '█';
const BAR_LENGTH = 10;  // Shorter length for Twitter

function updateProgressBar() {
    const percentage = progressSlider.value;
    const filledLength = Math.round((percentage / 100) * BAR_LENGTH);
    
    const filledPart = FULL.repeat(filledLength);
    const emptyPart = EMPTY.repeat(BAR_LENGTH - filledLength);
    
    const progressText = `${LEFT_CAP}${filledPart}${emptyPart}${RIGHT_CAP} ${percentage}%`;
    progressBar.textContent = progressText;
    percentageDisplay.textContent = `${percentage}%`;
}

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(progressBar.textContent);
        copyMessage.textContent = 'Copied!';
        copyMessage.classList.add('visible');
        setTimeout(() => {
            copyMessage.classList.remove('visible');
        }, 2000);
    } catch (err) {
        copyMessage.textContent = 'Failed to copy';
        copyMessage.classList.add('visible');
    }
}

progressSlider.addEventListener('input', updateProgressBar);
copyButton.addEventListener('click', copyToClipboard);
progressBar.addEventListener('click', copyToClipboard);

// Initialize the progress bar
updateProgressBar(); 