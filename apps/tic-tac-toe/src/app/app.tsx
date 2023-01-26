// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {Game} from './game/game'
import {SaveStep, Step} from './constants'

import {useState} from 'react';

function checkWinner(board: SaveStep, inRow: number, x: number, y: number, currentTep: Step): boolean {
  let count = 0;
  // check rows
  for (let i = 0; i < inRow; i++) {
    const step = i + 1

    const stepName = (board[x] || {})[y - step];
    if (stepName !== currentTep) {
      break;
    }
    count++;

  }

  for (let i = 0; i < inRow; i++) {
    const step = i + 1

    const stepName = (board[x] || {})[y + step];
    if (stepName !== currentTep) {
      break;
    }
    count++;
  }

  if (count + 1 === inRow) {
    return true;
  }

  // check columns
  count = 0;

  for (let i = 0; i < inRow; i++) {
    const step = i + 1
    const stepName = (board[x - step] || {})[y];
    if (stepName !== currentTep) {
      break;
    }
    count++;
  }

  for (let i = 0; i < inRow; i++) {
    const step = i + 1
    const stepName = (board[x + step] || {})[y];
    if (stepName !== currentTep) {
      break;
    }
    count++;
  }
  if (count + 1 === inRow) {
    return true;
  }

  count = 0

  // check diagonals
  for (let i = 0; i < inRow; i++) {
    const step = i + 1
    const stepName = (board[x - step] || {})[y - step];
    if (stepName !== currentTep) {
      break;
    }
    count++;
  }

  for (let i = 0; i < inRow; i++) {
    const step = i + 1
    const stepName = (board[x + step] || {})[y + step];
    if (stepName !== currentTep) {
      break;
    }
    count++;
  }

  return count + 1 === inRow;
}



export function App() {

  const [size, setSize] = useState<number>(10);
  const [countForWinner, setCountForWinner] = useState<number>(3);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [gameStarting, setGameStarting] = useState<boolean>(false);
  const [saveStep, setSaveStep] = useState<SaveStep>({})
  const [winner, setWinner] = useState<Step | null>(null);

  const handlerCLick = (stepPlayer: [x: number, y: number]) => {
    if (!gameStarting || winner) {
      return;
    }
    const [x,y] = stepPlayer;

    const isWinner = checkWinner(saveStep, countForWinner, x, y, currentStep);

    if (!saveStep[stepPlayer[0]]) {
      saveStep[stepPlayer[0]] = {}
    }
    saveStep[stepPlayer[0]][stepPlayer[1]] = currentStep

    setSaveStep(saveStep);
    if (isWinner) {
      setWinner(currentStep);
    }
    setCurrentStep(currentStep === 1 ? 2 : 1);
  }

  const resetGame = () => {
    if (gameStarting) {
      setSaveStep([])
      setCurrentStep(1)
    }
    setGameStarting(!gameStarting)
    setWinner(null)
  }

  return (
    <div>
      <div>
        <div>
          <label>Size</label>
          <input value={size} disabled={true}/>
        </div>
        <div>
          <label>Count for winner</label>
          <select disabled={gameStarting} value={countForWinner} onChange={(event) => setCountForWinner(parseInt(event.target.value, 10))}>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div>
          <button onClick={resetGame}>
            {gameStarting ? 'End Current Game': 'Start new game'}
          </button>
          {gameStarting && <span>
            Current step: <strong>Player {currentStep}</strong>
          </span>
          }
          {winner && <span>
            Winner: <strong>Player {winner}</strong>
          </span>}
        </div>
      </div>
      <Game
        size={size}
        countWinner={countForWinner}
        saveStep={saveStep}
        onClick = {handlerCLick}
      ></Game>
    </div>
  );
}

export default App;
