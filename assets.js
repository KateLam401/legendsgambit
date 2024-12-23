const regions = ['gold', 'silver', 'copper', 'iron'];
const pieces = ['board', 'pawn', 'rook', 'knight', 'bishop', 'king', 'legend'];
const assets = {};

regions.forEach(region => {
    assets[region] = {};
    pieces.forEach(piece => {
        assets[region][piece] = `assets/${region}${piece}.png`;
    });
});

console.log(assets); // Outputs paths for all assets

document.getElementById('applyCustomizations').addEventListener('click', () => {
    const boardImage = document.getElementById('boardUpload').files[0];
    const pieceImages = document.getElementById('pieceUpload').files;

    if (boardImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelectorAll('.square').forEach(square => {
                square.style.backgroundImage = `url(${e.target.result})`;
            });
        };
        reader.readAsDataURL(boardImage);
    }

    if (pieceImages.length > 0) {
        // Assign images to pieces dynamically here
    }
});
