import React from 'react'
import './Note.css'
import note from '../../icone/alert.svg'

function Note(props) {
  return (
    <>
        <div className='note'>
           
              <div className='inline'>
               <div> <img src={note}/></div>
                <div><span>Note : </span>Dans cette page, vous pouvez {props.text}</div>
              </div>
       
        </div>
    </>
  )     
}

export default Note