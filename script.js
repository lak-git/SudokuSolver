const board = document.getElementById('sudoku-board');
const numberPad = document.getElementById('number-pad');
const solveBtn = document.getElementById('solve-btn');
const clearBtn = document.getElementById('clear-btn');

let selectedCell = null;
let puzzle = Array(9).fill().map(() => Array(9).fill(0));
let originalPuzzle = Array(9).fill().map(() => Array(9).fill(0));

// Create Sudoku board
for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        // Add thicker borders for 3x3 boxes
        if (row % 3 === 0) cell.style.borderTopWidth = '2px';
        if (col % 3 === 0) cell.style.borderLeftWidth = '2px';
        if (row === 8) cell.style.borderBottomWidth = '2px';
        if (col === 8) cell.style.borderRightWidth = '2px';
        
        cell.addEventListener('click', () => {
            // Deselect previous cell
            if (selectedCell) {
                selectedCell.classList.remove('selected');
            }
            
            // Select new cell
            selectedCell = cell;
            cell.classList.add('selected');
        });
        
        board.appendChild(cell);
    }
}

// Create number pad
for (let i = 1; i <= 9; i++) {
    const btn = document.createElement('button');
    btn.classList.add('num-btn');
    btn.textContent = i;
    btn.addEventListener('click', () => {
        if (selectedCell) {
            const row = parseInt(selectedCell.dataset.row);
            const col = parseInt(selectedCell.dataset.col);
            
            // Update puzzle and UI
            puzzle[row][col] = i;
            selectedCell.textContent = i;
            selectedCell.classList.add('fixed');
        }
    });
    numberPad.appendChild(btn);
}

// Add clear button functionality
clearBtn.addEventListener('click', () => {
    // Clear puzzle data
    puzzle = Array(9).fill().map(() => Array(9).fill(0));
    
    // Clear UI
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('fixed');
        cell.classList.remove('selected');
    });
    
    selectedCell = null;
});

// Solve button functionality
solveBtn.addEventListener('click', () => {
    // Simple animation to show solving
    solveBtn.textContent = 'Solving...';
    solveBtn.disabled = true;
    
    // In a real implementation, this would call a solving algorithm
    // For demo purposes, just fill with a sample solution
    const sampleSolution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
    
    // Update the UI with the solution
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (cell.textContent) {
            puzzle[row][col] = parseInt(cell.textContent);
        }
    });
    console.log(puzzle);

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        cell.textContent = sampleSolution[row][col];
        cell.classList.add('fixed');
    });
    
    solveBtn.textContent = 'Solve Sudoku';
    solveBtn.disabled = false;
});