let myWallet = 1000;
let currentPot = 0;
let gameActive = false;

// DOM Elements
const walletDisplay = document.getElementById('coin-balance');
const bettingArea = document.getElementById('betting-area');
const gameInfoArea = document.getElementById('active-game-info');
const potDisplay = document.getElementById('current-pot');
const gameStatus = document.getElementById('game-status');
const diceDisplay = document.getElementById('dice-display');

// Utility: Format numbers with commas
const formatCoins = (num) => num.toLocaleString();

function placeBet(amount) {
    if (myWallet >= amount) {
        myWallet -= amount;
        currentPot = amount * 2;
        gameActive = true;
        
        updateUI();
        bettingArea.style.display = 'none';
        gameInfoArea.style.display = 'block';
        gameStatus.innerText = "Game Started! It's your turn.";
    } else {
        alert("Not enough coins! Buy more in the shop.");
    }
}

function rollDice() {
    if (!gameActive) return;
    
    const rollBtn = document.getElementById('roll-btn');
    rollBtn.disabled = true; // Prevent double clicking
    
    // Simple visual rolling animation
    let rollCount = 0;
    gameStatus.innerText = "Rolling...";
    
    const rollInterval = setInterval(() => {
        diceDisplay.innerText = Math.floor(Math.random() * 6) + 1;
        diceDisplay.style.transform = `rotate(${Math.random() * 360}deg)`;
        rollCount++;
        
        if (rollCount > 10) {
            clearInterval(rollInterval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            diceDisplay.innerText = finalRoll;
            diceDisplay.style.transform = "rotate(0deg)";
            gameStatus.innerText = `You rolled a ${finalRoll}!`;
            rollBtn.disabled = false;
        }
    }, 50); // Updates every 50ms for half a second
}

function simulateWin() {
    myWallet += currentPot;
    endMatch("Victory! You won the pot. 🏆");
}

function simulateLoss() {
    endMatch("Defeat! The bot took the pot. 💀");
}

function endMatch(message) {
    setTimeout(() => {
        alert(message);
        currentPot = 0;
        gameActive = false;
        updateUI();
        
        bettingArea.style.display = 'block';
        gameInfoArea.style.display = 'none';
        diceDisplay.innerText = '🎲';
    }, 500); // Small delay so player can read the last status
}

function updateUI() {
    walletDisplay.innerText = formatCoins(myWallet);
    potDisplay.innerText = formatCoins(currentPot);
}

// Generate the visual board
function createBoard() {
    const board = document.getElementById('board');
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            if (row < 6 && col < 6) cell.classList.add('red-base');
            else if (row < 6 && col > 8) cell.classList.add('green-base');
            else if (row > 8 && col < 6) cell.classList.add('blue-base');
            else if (row > 8 && col > 8) cell.classList.add('yellow-base');
            
            board.appendChild(cell);
        }
    }
}

createBoard();
