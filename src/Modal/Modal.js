import React from 'react'
import classes from './Modal.module.css'
const Modal=(props)=>{
    return(
        <React.Fragment>
        <div className={classes.backdrop}></div>
    <div className={classes.modal}>{props.children}</div>
    </React.Fragment>
    )

}
 export default Modal