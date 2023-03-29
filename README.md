# Sudoku_solver
Solves Sudoku

https://user-images.githubusercontent.com/117552685/228420861-7cb9aa75-763a-4d15-936e-9c5960e4f33c.mp4

gif of working (src: gify)

# Theory

This code uses a backtracking algorithm to solve Sudoku puzzles. The function `solveSudoku` uses a recursive approach to find a solution. It first checks if the board is full, in which case it returns `true`. If the board is not full, it looks for the first empty cell and tries filling it with a number from 1 to 9. It then checks if the move is valid using the `isValidMove` function. If the move is valid, it makes the move and recursively calls solveSudoku to try and solve the rest of the board. If the move is not valid, it resets the cell to empty and tries the next number. If none of the numbers work, it returns `false`.

The `isValidMove` function checks if the number being placed in a cell is valid by checking if it is already present in the same row, column, or 3x3 sub-grid as the cell. If the number is not present in any of these, it returns true, indicating that the move is valid. If the number is present, it returns `false`.
