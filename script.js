const progressSlider = document.getElementById('progressSlider');
const percentageDisplay = document.getElementById('percentageDisplay');
const progressBar = document.getElementById('progressBar');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');
const styleSelect = document.getElementById('styleSelect');

// Progress bar styles
const styles = {
    blocks: {
        left: '【',
        right: '】',
        empty: '　',
        full: '█'
    },
    lines: {
        left: '|',
        right: '|',
        empty: '░',
        full: '|'
    },
    circles: {
        left: '(',
        right: ')',
        empty: '○',
        full: '●'
    },
    squares: {
        left: '[',
        right: ']',
        empty: '□',
        full: '■'
    },
    stars: {
        left: '『',
        right: '』',
        empty: '☆',
        full: '★'
    }
};

let currentStyle = styles.blocks;
const BAR_LENGTH = 10;

function updateProgressBar() {
    const percentage = progressSlider.value;
    const filledLength = Math.round((percentage / 100) * BAR_LENGTH);
    
    const filledPart = currentStyle.full.repeat(filledLength);
    const emptyPart = currentStyle.empty.repeat(BAR_LENGTH - filledLength);
    
    const progressText = `${currentStyle.left}${filledPart}${emptyPart}${currentStyle.right} ${percentage}%`;
    progressBar.textContent = progressText;
    percentageDisplay.textContent = `${percentage}%`;
}

function changeStyle(event) {
    currentStyle = styles[event.target.value];
    updateProgressBar();
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
styleSelect.addEventListener('change', changeStyle);

// Initialize the progress bar
updateProgressBar(); 