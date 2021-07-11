/**
 * calculateWinner finds out if the current board has a winner or not
 * @param {('X' | 'O' | null)[]} board
 * @returns 'X' | 'O' | null
 */
export function calculateWinner(board) {
  const s = board.map((x, i) => x || i).join('');

  // https://regex101.com/r/SEC1fz/1
  const colWinner = s.match(/(.)(?=(?:..\1){2})/);
  if (colWinner) {
    return colWinner[1]
  }

  // https://regex101.com/r/hn2jSj/1
  const rowWinner = s.match(/(.)\1\1((...)*$)/);
  if (rowWinner) {
    return rowWinner[1]
  }

  // https://regex101.com/r/B86h4s/1
  const a1DWinner = s.match(/..(.).\1.\1../);
  if (a1DWinner) {
    return a1DWinner[1]
  }

  // https://regex101.com/r/vmqIHC/1
  const a3DWinner = s.match(/(.)...\1...\1/);
  if (a3DWinner) {
    return a3DWinner[1]
  }

  return null;
}
