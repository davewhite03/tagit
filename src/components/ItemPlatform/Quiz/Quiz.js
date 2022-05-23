
import React,{useContext, useState} from 'react';
import Modal from '../../../Modal/Modal';



import Button from "./../UI/Button";

import classes from './Quiz.module.css';



 const Quiz=(props)=>{
const [quizAnswer,setQuizAnswer]=useState();



const answerHandler=event=>{
   setQuizAnswer(event.target.value)
}

const submitHandler=(event)=>{
    event.preventDefault()
    const answer={
        answer: quizAnswer,
    }

    props.onAnswer(answer)
    
}


    
     




    
return(
    <React.Fragment>
        <div className={classes.backdrop}></div>
        <Modal className={classes.platform}>
          <form onSubmit={submitHandler}>
            <h2>{props.quiz}</h2>
            <input className={classes.input} type='text' onChange={answerHandler}/>
            <Button type='submit'>Submit</Button>
            <Button className={classes.close} onClick={props.onHideQuiz} >Close</Button>
            </form>
            
        </Modal>
    </React.Fragment>
)
 }
 export default Quiz