import React,{useState} from 'react';
import AudioPlayer from './Music/AudioPlayer';
import Quiz from './Quiz/Quiz';
import classes from './ItemPlatform.module.css';
import sound from './Music/Music1.mp3'



const creatorContent=[
    {
        
    id:1,
    song:sound,
    quiz:'What is the first word in the second verse?',
    answer:'you',
    },
   
];
    


const ItemPlatform=(props)=>{
const[quizScreen,setQuizScreen]=useState(false);
const[quizQuest,setQuizQuest]=useState('');
const [gameToken,setGameToken]=useState(1)

const submittedAnswer=(event)=>{

   if(event.answer===props.answer){
       alert('correct!')
       setQuizScreen(false)
       setGameToken(gameToken+ 1)
       console.log(gameToken)
       props.onToken(gameToken)
   }else{
    
       alert('Wrong!Try again!')
   }

}


const showQuizScreen=(event)=>{
   
    setQuizQuest(event)
    setQuizScreen(true)
 
    
}

const hideQuizScreen=()=>{
   
   
    setQuizScreen(false);
}
 console.log(props.quiz)


return(
    <React.Fragment>
      
        <div >
            
        {quizScreen &&<Quiz quiz={props.quiz} answer={props.answer}onContent={creatorContent} onAnswer={submittedAnswer}  onHideQuiz={hideQuizScreen}/>}
           
          
 
            </div>
           
            <AudioPlayer answer={creatorContent.answer}quiz={creatorContent.quiz} key={creatorContent.id} music={props.audio} onShowQuiz={showQuizScreen}/>
    </React.Fragment>
)
}
export default ItemPlatform