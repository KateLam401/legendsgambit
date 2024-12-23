function customQueenMoves(square) {
    // Example: Queen can teleport
    const queen = chess.get(square);
    if (queen && queen.type === 'q') {
        const allSquares = generateAllSquares();
        return allSquares.filter(sq => sq !== square); // Allow moving to any square
    }
}

function generateAllSquares() {
    const squares = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            squares.push(`${String.fromCharCode(97 + i)}${8 - j}`);
        }
    }
    return squares;
}
