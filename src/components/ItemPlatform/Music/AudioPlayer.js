import React,{useState,useRef,useEffect} from  "react";
import Button from "./../UI/Button";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
  

import classes from './AudioPlayer.module.css';
import { AiFillDislike } from "react-icons/ai";


const AudioPlayer=(props)=>{
    const[isPlaying,setIsPlaying]=useState(false);
    const [duration,setDuration]=useState(0);
    const [currentTime,setCurrentTime]=useState(0);
    const [quizQuest,setQuizQuest]=useState(props.quiz);
    const [quizAnswer,setQuizAnswer]=useState(props.answer);
  

const audioPlayer = useRef() //refrence audio component
const progressBar = useRef();   // reference our progress bar
const animationRef= useRef();




useEffect(()=>{
    const seconds= Math.floor(audioPlayer.current.duration)
setDuration(seconds)
progressBar.current.max=seconds;
},[audioPlayer?.current?.loadedmetadata,audioPlayer?.current?.readyState])

const calculateTime=(sec)=>{
    const minutes= Math.floor(sec/60);
    const returnedMinutes = minutes <10 ? `0${minutes}`: `${minutes}`;
    const seconds= Math.floor(sec% 60);
    const returnedSeconds= seconds <10 ? `0${seconds}`:`${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
}

    const playHandler=()=>{
        
        const preValue=isPlaying;
        setIsPlaying(!preValue);
        if(!preValue){
            audioPlayer.current.play();
            animationRef.current=requestAnimationFrame(whilePlaying)
        }else{
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
        
    }
    const whilePlaying=()=>{
        progressBar.current.value=audioPlayer.current.currentTime;
        setCurrentTime(progressBar.current.value);
        animationRef.current=requestAnimationFrame(whilePlaying)
    }
   
    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
       setCurrentTime(progressBar.current.value)
      }
    
        const quizHandler=(event)=>{
            event.preventDefault()
             setQuizQuest(props.quiz)
             setQuizAnswer(props.answer)
             const data={
                 quiz:quizQuest,
                 answer:quizAnswer,
             }
             props.onShowQuiz(data)
             
         }
     
     console.log(props.music?.asset.url)
     let address = JSON.stringify(props.music)
     console.log(address)
     console.log(address?.split(''))
    return(
        <React.Fragment>
          
            <div  className={classes.audioPlayer}>
                
                <audio ref={audioPlayer}  src={props.music?.asset.url} preload="metadata"></audio>
                <Button className={classes.play} onClick={playHandler}>{!isPlaying ? <FaPlay/> : <FaPause/>}</Button>
             <form onSubmit={quizHandler} className={classes.audioPlayer}>
                <div>{calculateTime(currentTime)}</div>
                
               <input className={classes.progressBar}type="range" defaultValue='0' ref={progressBar} onChange={changeRange}/>

                <div>{(duration && !isNaN(duration))&& calculateTime(duration)}</div>
               <Button type='submit'  ><FaPencilAlt/></Button>
               </form>
               <hr className={classes.hr2}></hr>
            </div>
            <hr className={classes.hr}></hr>
           
            
        </React.Fragment>
    )
}

export default AudioPlayer