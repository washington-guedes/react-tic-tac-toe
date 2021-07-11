import React from 'react';
import { Board } from './board';
import { calculateWinner } from './calculateWinner';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastMovePlayed: -1,
        winningMoves: [],
      }],
      stepNumber: 0,
      orderAsc: true,
    };
  }

  squares() {
    const { history } = this.state;
    return history[this.state.stepNumber].squares;
  }

  winningMoves() {
    const { history } = this.state;
    return history[this.state.stepNumber].winningMoves;
  }

  turnOf(i) {
    return i % 2 === 0 ? 'X' : 'O';
  }

  turn() {
    return this.turnOf(this.state.stepNumber);
  }

  isDrawn() {
    return this.squares().every(x => x != null);
  }

  hasAWinner() {
    return calculateWinner(this.squares()) != null;
  }

  isFinished() {
    return this.isDrawn() || this.hasAWinner();
  }

  status() {
    const squares = this.squares();

    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${squares[winner[0]]}`;
    }

    if (this.isDrawn()) {
      return 'Game drawn';
    }

    return `Next to play: ${this.turn()}`;
  }

  handleClick(i) {
    if (this.isFinished()) {
      alert('game finished');
      return;
    }

    const squares = this.squares().slice();
    if (squares[i] != null) {
      alert('choose another square');
      return;
    }

    squares[i] = this.turn();

    this.setState({
      history: this.state.history.slice(0, this.state.stepNumber + 1).concat({
        squares,
        lastMovePlayed: i,
        winningMoves: calculateWinner(squares)
      }),
      stepNumber: this.state.stepNumber + 1,
    });
  }

  jumpTo(stepNumber) {
    this.setState({ stepNumber })
  }

  getCoordinates(i) {
    const letter = 'abc'[i % 3];
    const digit = 3 - Math.floor(i / 3);
    return letter + digit;
  }

  getMoveDescription(stepNumber, lastMovePlayed) {
    if (stepNumber === 0) {
      return 'Initial position'
    }

    let prefix = '';
    if (stepNumber % 2 === 1) {
      prefix = Math.floor(stepNumber / 2) + 1 + '. ';
    }

    const moveDescription = `${this.turnOf(stepNumber-1)}:${this.getCoordinates(lastMovePlayed)}`;
    return prefix + moveDescription;
  }

  getMove(stepNumber) {
    const classGroup = ['move'];

    if (this.state.stepNumber === stepNumber) {
      classGroup.push('current-shown');
    }

    return (
      <div
        key={stepNumber}
        className={classGroup.join(' ')}
        onClick={() => this.jumpTo(stepNumber)}
      >
        {this.getMoveDescription(stepNumber, this.state.history[stepNumber].lastMovePlayed)}
      </div>
    );
  }

  getAllMoves() {
    const startingPosition = this.getMove(0);
    const allMoves = [
      <div className="move-group" key="0">{startingPosition}</div>
    ];

    for (let i = 1, l = this.state.history.length; i < l; i += 2) {
      const moveGroup = [this.getMove(i)]
      if (i + 1 < l) {
        moveGroup.push(this.getMove(i+1))
      }
      allMoves.push(<div className="move-group" key={i}>{moveGroup}</div>);
    }

    return this.state.orderAsc ? allMoves : allMoves.reverse();
  }

  toggleMovesOrder() {
    this.setState({ orderAsc: !this.state.orderAsc });
  }

  render() {
    return (
      <div className="game">
        <div className="game-info">
          {this.status()}
        </div>
        <div className="game-board">
          <Board
            squares={this.squares()}
            winningMoves={this.winningMoves()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-moves">
          {this.getAllMoves()}
        </div>
        <button className="toggle-button" onClick={() => this.toggleMovesOrder()}>
          {this.state.orderAsc ? 'last moves first' : 'initial moves first'}
        </button>
      </div>
    );
  }
}
