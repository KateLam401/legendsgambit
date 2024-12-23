const chess = new Chess(); // Using chess.js library

// Draw the board
const chessboard = document.getElementById('chessboard');
const boardState = chess.board(); // Get board state from chess.js

// Function to render the chessboard
function drawBoard() {
    const boardState = chess.board();
    chessboard.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square', (row + col) % 2 === 0 ? 'light' : 'dark');
            const piece = boardState[row][col];
            if (piece) {
                const img = document.createElement('img');
                img.src = `assets/${piece.color}${piece.type}.png`; // Adjust path as needed
                img.classList.add('piece');
                square.appendChild(img);
            }
            square.dataset.position = `${String.fromCharCode(97 + col)}${8 - row}`;
            chessboard.appendChild(square);
        }
    }
}

// Initial rendering of the board
drawBoard();

// Variables to track selected piece and valid moves
let selectedSquare = null;
let validMoves = [];

// Event listener for user interactions
chessboard.addEventListener('click', (event) => {
    const target = event.target;
    const square = target.classList.contains('square') ? target : target.parentElement;
    const position = square.dataset.position;

    if (selectedSquare) {
        // Attempt to make the move
        const move = chess.move({ from: selectedSquare, to: position, promotion: 'q' });
        if (move) {
            drawBoard();
            checkGameOver();
            // AI's turn
            getAIMove(selectedDifficulty);
        } else {
            console.log('Invalid move');
        }
        selectedSquare = null;
        validMoves = [];
    } else {
        // Select the piece and highlight valid moves
        if (chess.get(position) && chess.get(position).color === chess.turn()) {
            selectedSquare = position;
            validMoves = chess.moves({ square: position, verbose: true }).map(m => m.to);
            highlightValidMoves();
        }
    }
});

// Function to highlight valid moves
function highlightValidMoves() {
    document.querySelectorAll('.square').forEach(sq => {
        sq.classList.remove('highlight');
        if (validMoves.includes(sq.dataset.position)) {
            sq.classList.add('highlight');
        }
    });
}

// Function to check for game over conditions
function checkGameOver() {
    if (chess.in_checkmate()) {
        alert('Checkmate! Game over.');
    } else if (chess.in_stalemate()) {
        alert('Stalemate! Game over.');
    } else if (chess.in_draw()) {
        alert('Draw! Game over.');
    }
}
