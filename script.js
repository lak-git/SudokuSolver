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
    solveBtn.textContent = 'Solve Sudoku';
});


// Solve button functionality
solveBtn.addEventListener('click', () => {
    // Simple animation to show solving
    solveBtn.textContent = 'Solving...';
    solveBtn.disabled = true;
    
    // Update the UI with the solution
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (cell.textContent) {
            puzzle[row][col] = parseInt(cell.textContent);
        }
    });
    
    if (backtrackSolve(puzzle)) {
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            cell.textContent = puzzle[row][col];
            cell.classList.add('fixed');
        });
        solveBtn.textContent = 'Solve Sudoku';        
    }
    else{
        solveBtn.textContent = 'No Solution!';
    }

    solveBtn.disabled = false;
});
function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return [i, j];
            }
        }
    }
}
function isValid(board, row, col, number) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == number) {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        if (board[row][j] == number) {
            return false;
        }
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow +i][startCol + j] == number) {
                return false;
            }
        }
    }

    return true;
}
function backtrackSolve(board) {
    let position = findEmpty(board);
    if (position === undefined) {
        return true;
    }

    let row = position[0];
    let col = position[1];
    for (let num = 1; num < 10; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (backtrackSolve(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    
    return false;
}