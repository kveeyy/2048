document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    const size = 4;
    const tiles = [];

    // Initialize board
    for (let i = 0; i < size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('data-value', '0');
        board.appendChild(tile);
        tiles.push(tile);
    }

    // Add two initial tiles
    addRandomTile();
    addRandomTile();
    updateBoard();

    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event) {
        if (event.key === 'ArrowUp') move('up');
        if (event.key === 'ArrowDown') move('down');
        if (event.key === 'ArrowLeft') move('left');
        if (event.key === 'ArrowRight') move('right');
        updateBoard();
    }

    function addRandomTile() {
        const emptyTiles = tiles.filter(tile => tile.getAttribute('data-value') == 0);
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        randomTile.setAttribute('data-value', Math.random() < 0.9 ? '2' : '4');
    }

    function updateBoard() {
        tiles.forEach(tile => {
            const value = tile.getAttribute('data-value');
            tile.textContent = value > 0 ? value : '';
            tile.className = 'tile';
            tile.classList.add(`tile-${value}`);
        });
        scoreDisplay.textContent = score;
    }

    function move(direction) {
        let hasMoved = false;

        function moveTile(fromIndex, toIndex) {
            const fromTile = tiles[fromIndex];
            const toTile = tiles[toIndex];
            const fromValue = parseInt(fromTile.getAttribute('data-value'));
            const toValue = parseInt(toTile.getAttribute('data-value'));

            if (fromValue !== 0) {
                if (toValue === 0) {
                    toTile.setAttribute('data-value', fromValue);
                    fromTile.setAttribute('data-value', '0');
                    hasMoved = true;
                } else if (toValue === fromValue) {
                    toTile.setAttribute('data-value', fromValue * 2);
                    fromTile.setAttribute('data-value', '0');
                    score += fromValue * 2;
                    hasMoved = true;
                }
            }
        }

        function moveRow(row) {
            for (let col = 0; col < size; col++) {
                for (let nextCol = col + 1; nextCol < size; nextCol++) {
                    moveTile(row * size + nextCol, row * size + col);
                }
            }
        }

        function moveCol(col) {
            for (let row = 0; row < size; row++) {
                for (let nextRow = row + 1; nextRow < size; nextRow++) {
                    moveTile(nextRow * size + col, row * size + col);
                }
            }
        }

        switch (direction) {
            case 'up':
                for (let col = 0; col < size; col++) moveCol(col);
                break;
            case 'down':
                for (let col = 0; col < size; col++) moveCol(col);
                tiles.reverse();
                break;
            case 'left':
                for (let row = 0; row < size; row++) moveRow(row);
                break;
            case 'right':
                for (let row = 0; row < size; row++) moveRow(row);
                tiles.reverse();
                break;
        }

        if (hasMoved) addRandomTile();
    }
});
