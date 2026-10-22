
let currentplayer = "X";
let arr = Array(9).fill(null);
let gameOver = false;
let gameActive = false;

const cells = document.querySelectorAll(".col");
const status = document.getElementById("status");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");
const playBtn = document.getElementById("playBtn");

// Start the game
function playGame() {
    if (gameActive && !gameOver) return;

    resetBoard();
    gameActive = true;
    gameOver = false;

    status.innerText = "Player X's turn";
    playBtn.disabled = true;
}

// Reset the board
function resetBoard() {
    arr = Array(9).fill(null);
    currentplayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.innerText = "";
    });

    result.style.display = "none";
}

// Restart the game immediately
function restartGame() {
    resetBoard();
    gameActive = true;
    playBtn.disabled = true;
    status.innerText = "Player X's turn";
}

// Handle cell clicks
function handleclick(el) {
    if (!gameActive || gameOver) return;

    const id = Number(el.id);

    // Prevent overwriting an already-filled cell
    if (arr[id] !== null) return;

    arr[id] = currentplayer;
    el.innerText = currentplayer;

    if (winner()) {
        gameOver = true;
        gameActive = false;
        playBtn.disabled = false;
        return;
    }

    // Check for a draw
    if (!arr.includes(null)) {
        gameOver = true;
        gameActive = false;
        playBtn.disabled = false;

        status.innerText = "It's a draw!";
        showResult("It's a Draw!");
        return;
    }

    // Switch players
    currentplayer = currentplayer === "X" ? "O" : "X";
    status.innerText = `Player ${currentplayer}'s turn`;
}

// Check winner
function winner() {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            arr[a] !== null &&
            arr[a] === arr[b] &&
            arr[b] === arr[c]
        ) {
            status.innerText = `Player ${currentplayer} wins!`;
            showResult(`🎉 Player ${currentplayer} Wins!`);
            return true;
        }
    }

    return false;
}

// Show winner or draw message
function showResult(message) {
    resultText.innerText = message;
    result.style.display = "flex";
}

// Back to the previous browser page
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        exitGame();
    }
}

// Exit the current game
function exitGame() {
    resetBoard();
    gameActive = false;
    gameOver = false;
    playBtn.disabled = false;
    status.innerText = "Game exited. Press Play to start again.";
}
