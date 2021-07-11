export function Square(props) {
  const groupClass = ['square'];

  if (props.winningMove) {
    groupClass.push('winning-move');
  }

  return (
    <button
      className={groupClass.join(' ')}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}
