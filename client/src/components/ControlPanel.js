function ControlPanel({ onStart, onStop }) {
  return (
    <div>
      <h2>Control Panel</h2>
      <button onClick={onStart}> Start </button>
      <button onClick={onStop}> Stop </button>
    </div>
  );
}

export default ControlPanel;
