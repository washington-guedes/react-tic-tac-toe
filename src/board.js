import React from 'react';
import { Square } from './square';

export class Board extends React.Component {
  renderSquare(i) {
    const winningMove = (this.props.winningMoves || []).includes(i);

    return (
      <Square
        value={this.props.squares[i]}
        winningMove={winningMove}
        onClick={() => this.props.onClick(i)}
        key={i}
      />
    );
  }

  render() {
    return [...Array(3)].map((_, i) => (
      <div className="board-row" key={i}>
        {[...Array(3)].map((_, j) => this.renderSquare(i*3 + j))}
      </div>
    ));
  }
}
