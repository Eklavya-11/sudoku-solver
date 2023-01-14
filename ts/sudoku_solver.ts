
const board: number[][] = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]
];

/**
 * Function to solve a sudoku puzzle
 * @param {Array} board - 2D array representing the sudoku board
 * @return {boolean} - Returns true if a solution is found, false otherwise
 */

function solveSudoku(board: number[][]): boolean {
    // Check if the board is full
    let isFull = true;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                isFull = false;
                break;
            }
        }
    }
    if (isFull) {
        return true;
    }

    // Iterate through the board and find the first empty cell
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                // Try filling the empty cell with a number from 1 to 9
                for (let number = 1; number <= 9; number++) {
                    // Check if the move is valid
                    if (isValidMove(board, row, col, number)) {
                        // Make the move
                        board[row][col] = number;

                        // Recursively try to solve the rest of the board
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            // If the move leads to an invalid solution, reset the cell to empty
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

/**
 * Function to check if a move is valid in the sudoku board
 * @param {Array} board - 2D array representing the sudoku board
 * @param {number} row - Row index of the cell
 * @param {number} col - Column index of the cell
 * @param {number} number - Number to be placed in the cell
 * @return {boolean} - Returns true if the move is valid, false otherwise
 */
function isValidMove(board: number[][], row: number, col: number, number: number): boolean {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === number) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === number) {
            return false;
        }
    }

    // Check 3x3 square
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[squareRow + i][squareCol + j] === number) {
                return false;
            }
        }
    }

    return true;
}

if (solveSudoku(board)) {
    console.log(board);
} else {
    console.log('No solution found');
}
