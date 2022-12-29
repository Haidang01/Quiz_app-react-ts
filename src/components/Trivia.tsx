import React, { useEffect } from 'react'
import { useState } from 'react';
type Props = {
  data: Question[];
  questionNumber:number,
  setStop: React.Dispatch<React.SetStateAction<boolean>>,
  setQuestionNumber:React.Dispatch<React.SetStateAction<number>>
  setStopTime:React.Dispatch<React.SetStateAction<boolean>>,
}
interface Answer{
  text: string;
  correct: boolean
}
interface Question{
  id: number;
  question: string;
  answers: Answer[]
}
const Trivia = ({data,questionNumber,setStopTime,setQuestionNumber,setStop}: Props) => {
  const [ question, setQuestion ] = useState<Question | null>( null );
  const [ selectedQuestion, setSelectedQuestion ] = useState<Answer | null>(null);
  const [className, setClassName]=useState<string>('answer');
  useEffect( () => {
    setQuestion( data[ questionNumber - 1 ] );
  }, [ questionNumber ] );
  const handleClick = ( answer: Answer ) => {
    setStopTime( true );
    setSelectedQuestion( answer );  
    setClassName( 'answer active' );
    setTimeout( () => {
      setClassName( answer.correct? 'answer correct' :'answer wrong');
    },1000) 
    setTimeout( () => {
      if ( answer.correct ) {
        setQuestionNumber( pre => pre + 1 );
        setSelectedQuestion( null );
      } else {
        setStop( true );
      }
    },5000) 
  }
  return (
    <div className='trivia'>
      <div className="question">{ question?.question }</div>
      <div className="answers">
        { question?.answers.map( answer => (
          <div className={selectedQuestion===answer?className:'answer'} onClick={()=>handleClick(answer)} key={answer.text} >{ answer.text }</div>
      ))}
      </div>
    </div>
  )
}

export default Trivia