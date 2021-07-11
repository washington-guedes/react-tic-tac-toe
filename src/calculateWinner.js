/**
 * calculateWinner finds out the 3 moves that won the game.
 * if the game has no winner, null is returned.
 * @param {('X' | 'O' | null)[]} board
 * @returns number[]
 */
export function calculateWinner(board) {
  const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningPossibilities.length; i++) {
    const [a, b, c] = winningPossibilities[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return winningPossibilities[i];
    }
  }

  return null;
}
