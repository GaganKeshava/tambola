import { useState } from 'react'
import './App.css'

const getInitialGrid = () => {
  let numbers = new Array();
  for(let i=0; i<9; i++) {
    let nums = new Array();
    for(let j=(10*i)+1; j<=10*(i+1); j++) {
      let obj = {
        "tick": false,
        "value": j
      }
      nums.push(obj);
    }
    numbers.push(nums);
  }
  return numbers;
}

const createNumbers = () => {
  const numbers = new Array();
  for(let i=1; i<=90; i++) {
    numbers.push(i);
  }
  return numbers;
}

const shuffleNumbers = (numbers) => {
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements at i and j
  }
  return numbers;
}

function App() {
  const [grid, setGrid] = useState(() => getInitialGrid());
  const [availableNums, setAvailableNums] = useState(() => shuffleNumbers(createNumbers()));
  const [currentNum, setCurrentNum] = useState(0);

  const pickNumber = (availableNums) => {
    const randomIndex = Math.floor(Math.random() * availableNums.length);
    const randomNumber = availableNums[randomIndex];
    console.log(randomIndex, randomNumber)
    setCurrentNum(randomNumber);
    availableNums.splice(randomIndex, 1)[0];
    setAvailableNums(shuffleNumbers(availableNums));
    setGrid(grid => {
      return grid.map(row => {
        return row.map(column => {
          return column.value === randomNumber ? {...column, tick: true} : column
        })
      })
    })
  }

  const resetNumber = () => {
    setAvailableNums(shuffleNumbers(createNumbers()));
    setCurrentNum(0)
    setGrid(grid => {
      return grid.map(row => {
        return row.map(column => {
          return {...column, tick: false}
        })
      })
    })
  }

  return (
    <div className='main'>
      <h1 className='header'>Tambola</h1>
      <table>
        <tbody>
          {grid.map((row,i) => {
            return <tr key={i}>
              {row.map((column,j) => {
                return <td key={j} className={column.tick ? "ticked" : "unticked"} >{column.value}</td>
              })}
            </tr>
          })}
        </tbody>
      </table>
      <h1>{currentNum}</h1>
      <div className='buttonContainer'>
        <button className='pickNumber' onClick={() => pickNumber(availableNums)}>Pick Number</button>
        <button className='resetNumber' onClick={() => resetNumber()}>Reset</button>
      </div>
    </div>
  )
}

export default App
