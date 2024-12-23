// Initialize the Stockfish engine as a Web Worker
const stockfish = new Worker('path/to/stockfish.js');

// Function to request a move from the AI
function getAIMove(level) {
    // Ensure the skill level is within the valid range (0 to 20)
    const skillLevel = Math.max(0, Math.min(level, 20));
    stockfish.postMessage(`setoption name Skill Level value ${skillLevel}`);

    // Set the current board position in FEN format
    stockfish.postMessage('position fen ' + chess.fen());

    // Instruct Stockfish to calculate the best move with a specified depth
    stockfish.postMessage('go depth 10');

    // Handle messages received from Stockfish
    stockfish.onmessage = function(event) {
        const message = event.data;
        console.log('Stockfish:', message);

        // Check if the message contains the best move
        if (message.startsWith('bestmove')) {
            const move = message.split(' ')[1];
            const from = move.slice(0, 2);
            const to = move.slice(2, 4);
            const promotion = move.length > 4 ? move[4] : null; // Handle pawn promotion if applicable

            // Apply the move to the game state
            chess.move({ from, to, promotion });

            // Update the UI to reflect the new game state
            drawBoard();
        }
    };

    // Handle any errors from the Stockfish worker
    stockfish.onerror = function(error) {
        console.error('Stockfish error:', error);
    };
}

// Terminate the Stockfish worker when it's no longer needed
function terminateStockfish() {
    stockfish.terminate();
}
