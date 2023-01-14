package main

// Board combinations to Solve
var board = [9][9]int{
    {3, 0, 6, 5, 0, 8, 4, 0, 0},
    {5, 2, 0, 0, 0, 0, 0, 0, 0},
    {0, 8, 7, 0, 0, 0, 0, 3, 1},
    {0, 0, 3, 0, 1, 0, 0, 8, 0},
    {9, 0, 0, 8, 6, 3, 0, 0, 5},
    {0, 5, 0, 0, 9, 0, 6, 0, 0},
    {1, 3, 0, 0, 0, 0, 2, 5, 0},
    {0, 0, 0, 0, 0, 0, 0, 7, 4},
    {0, 0, 5, 2, 0, 6, 3, 0, 0},
}

func solveSudoku(board [9][9]int) bool {
    // Check if the board is full
    isFull := true
    for row := 0; row < 9; row++ {
        for col := 0; col < 9; col++ {
            if board[row][col] == 0 {
                isFull = false
                break
            }
        }
        if !isFull {
            break
        }
    }
    if isFull {
        return true
    }

    // Iterate through the board and find the first empty cell
    for row := 0; row < 9; row++ {
        for col := 0; col < 9; col++ {
            if board[row][col] == 0 {
                // Try filling the empty cell with a number from 1 to 9
                for number := 1; number <= 9; number++ {
                    // Check if the move is valid
                    if isValidMove(board, row, col, number) {
                        // Make the move
                        board[row][col] = number

                        // Recursively try to solve the rest of the board
                        if solveSudoku(board) {
                            return true
                        } else {
                            // If the move leads to an invalid solution, reset the cell to empty
                            board[row][col] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}

func isValidMove(board [9][9]int, row int, col int, number int) bool {
    // Check row
    for i := 0; i < 9; i++ {
        if board[row][i] == number {
            return false
        }
    }

    // Check column
    for i := 0; i < 9; i++ {
        if board[i][col] == number {
            return false
        }
    }

    // Check 3x3 square
    squareRow := row / 3 * 3
    squareCol := col / 3 * 3
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if board[squareRow+i][squareCol+j] == number {
                return false
            }
        }
    }

    return true
}

func main() {
    if solveSudoku(board) {
        for _, row := range board {
            for _, col := range row {
                fmt.Print(col, " ")
            }
            fmt.Println()
        }
    } else {
        fmt.Println("No solution found")
    }
}

