import "./App.css";
import { Board } from "./components/board";
import { Square } from "./components/square";
import { useState, useEffect } from "react";
import { toBeEmpty } from "@testing-library/jest-dom/matchers";

const defaultSquares = () => new Array(9).fill(null);
const lines = [
  [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]

function App() {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);



  useEffect(()=> {

      const isComputerTurn = squares.filter(sq => sq !== null).length % 2 === 1


      const linesthatAre = (a,b,c) => {

      return lines.filter(squareIndexe => {
        const squareValues = squareIndexe.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort())
      })
       
  } 
       const emptyIndeces = squares
      .map( (sq, index) => sq === null ? index : null)
      .filter ( (val) => val !== null );


       const  playerWon = linesthatAre('x','x','x').length > 0 
       const computerWon = linesthatAre('o','o','o').length > 0 
//--------------------------------------------------------------------      
    //setting up winners

      if(playerWon){
        setWinner("You won")
      return;
      }
      if (computerWon){
      setWinner("Computer won")
      return;
    }
 //--------------------------------------------------------------------      
    
    //function that put 'o' in empty squares when it's the computer turn
      const putCompAt = index => {
      let newSquares = squares
      newSquares[index] = 'o'
      setSquares([...newSquares])
    }
     
     if(isComputerTurn){

      const winLine = linesthatAre('o','o',null)
     if(winLine.length > 0){
      const winIndex = winLine[0].filter(idx => squares[idx] === null)[0];
      putCompAt(winIndex);
        return;
      }

      const lineTOBlock = linesthatAre('x','x', null)
      if(lineTOBlock.length > 0){
      const blockIndex = lineTOBlock[0].filter(idx => squares[idx] === null)[0];
      putCompAt(blockIndex)
        return;

      }
      

      const randomIndex = emptyIndeces[Math.ceil(Math.random()*emptyIndeces.length)]
      putCompAt(randomIndex);
    }

      //useEffect is triggered everytime [squares] changes
  }, [squares])

  const handleSquareClick = (index) => {
    const isPlayerTurn = squares.filter(sq => sq !== null).length % 2 === 0 
    if(isPlayerTurn){
    let newSquares = squares
    newSquares[index] = 'x'
    setSquares([...newSquares])
    }

  }  


  return (
    <div className="App">
      <div className="board">
        {squares.map((square, index) => {
          return <Square 
            x={square === 'x'?1:0}
            o={square === 'o'?1:0}
            onClick={()=> handleSquareClick(index)} />;

        })}
      </div>
        {!!winner && <h2> {winner} </h2>}
    </div>
  );
}

export default App;
