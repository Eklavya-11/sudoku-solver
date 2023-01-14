fn solve_sudoku(board: &mut Vec<Vec<u8>>) -> bool {
    // Check if the board is full
    let mut is_full = true;
    for row in 0..9 {
        for col in 0..9 {
            if board[row][col] == 0 {
                is_full = false;
                break;
            }
        }
        if !is_full {
            break;
        }
    }
    if is_full {
        return true;
    }

    // Iterate through the board and find the first empty cell
    for row in 0..9 {
        for col in 0..9 {
            if board[row][col] == 0 {
                // Try filling the empty cell with a number from 1 to 9
                for number in 1..10 {
                    // Check if the move is valid
                    if is_valid_move(board, row, col, number) {
                        // Make the move
                        board[row][col] = number;

                        // Recursively try to solve the rest of the board
                        if solve_sudoku(board) {
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

fn is_valid_move(board: &Vec<Vec<u8>>, row: usize, col: usize, number: u8) -> bool {
    // Check row
    for i in 0..9 {
        if board[row][i] == number {
            return false;
        }
    }

    // Check column
    for i in 0..9 {
        if board[i][col] == number {
            return false;
        }
    }

    // Check 3x3 square
    let square_row = row / 3 * 3;
    let square_col = col / 3 * 3;
    for i in 0..3 {
        for j in 0..3 {
            if board[square_row + i][square_col + j] == number {
                return false;
            }
        }
    }

    return true;
}

fn main() {
    let mut board = vec![vec![3, 0, 6, 5, 0, 8, 4, 0, 0],
                         vec![5, 2, 0, 0, 0, 0, 0, 0, 0],
                         vec![0, 8, 7, 0, 0, 0, 0, 3, 1],
                         vec![0, 0, 3, 0, 1, 0, 0, 8, 0],
                         vec![9, 0, 0, 8, 6, 3, 0, 0, 5],
                         vec![0, 5, 0, 0, 9, 0, 6, 0, 0],
                         vec![1, 3, 0, 0, 0, 0, 2, 5, 0],
                         vec![0, 0, 0, 0, 0, 0, 0, 7, 4],
                         vec![0, 0, 5, 2, 0, 6, 3, 0, 0]];

    if solve_sudoku(&mut board) {
        for row in &board {
            for col in row {
                print!("{} ", col);
            }
            println!();
        }
    } else {
        println!("No solution found");
    }
}

