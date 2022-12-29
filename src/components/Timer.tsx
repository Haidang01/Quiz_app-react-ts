import React from 'react'
import { useState, useEffect } from 'react';

type Props = {
  setStop: React.Dispatch<React.SetStateAction<boolean>>,
  setTimer: React.Dispatch<React.SetStateAction<number>>,
  timer:number,
  questionNumber: number,
  stop: boolean,
  stopTime:boolean
}

const Timer = ({stopTime,timer,questionNumber,setTimer,setStop}: Props) => {
  useEffect( () => {
    if ( timer === 0 ) return setStop( true );
    const interval = setInterval( () => {
      setTimer( pre => pre - 1 )
    }, 1000 )
    if ( stopTime ) {
      return clearInterval( interval );
    };
     return ()=>clearInterval( interval );
  }, [ setStop, timer,stopTime ] );
  useEffect(() => {
    setTimer( 30 );
  }, [ questionNumber ] )
  
  return (
    <div className="timer">{timer}</div>
  )
}

export default Timer