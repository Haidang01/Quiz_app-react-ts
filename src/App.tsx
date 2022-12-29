import { useEffect, useState } from 'react';
import './App.css';
import {  data, moneyList } from './data';
import Trivia from './components/Trivia';
import Timer from './components/Timer';
function App () {
  const [ stopTime, setStopTime ] = useState<boolean>(false);
  const [ timer, setTimer ] = useState<number>(10);
  const [ questionNumber, setQuestionNumber ] = useState<number>(1);
  const [ stop, setStop ] = useState<boolean>(false);
  const [ money, setMoney ] = useState<string | undefined>( '$ 0' );
  useEffect( () => {
    setStopTime( false );
    questionNumber > 15 && setStop(true);
    questionNumber > 1 && setMoney( moneyList.find( item => item.id === ( questionNumber - 1 ) )?.amount )
  }, [ moneyList, questionNumber ] );
  
  
  return (
    <div className="App">
      <div className="main">
      { stop ? (
          <h1 className='endText'>You have won: {money}</h1>
      ) : <>
        <div className="top">
              <Timer
                stopTime={stopTime}
                setTimer={setTimer}
                timer={ timer }
                stop={stop}
                setStop={setStop}
                questionNumber={questionNumber}
              />
        </div>
        <div className="bottom">
              <Trivia
                setStopTime={setStopTime}
                data={data}
                setStop={ setStop }
                questionNumber={questionNumber}
                setQuestionNumber={ setQuestionNumber } />
          </div>
        </> }
      </div>
      <div className="money">
        <ul className="moneyList">
          { moneyList.map( item => (
            <li className={ questionNumber === item.id ? "moneyItem active" : 'moneyItem'} key={item.id}>
              <span className="moneyItemNumber">{item.id}</span>
              <span className="moneyItemAmount">{item.amount }</span>
          </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
