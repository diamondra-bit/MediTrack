import React, { useState,useEffect } from 'react'
import './Notif.css'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar'
import { NotificationProvider, useNotification } from '../../Context/NotificationProvider';
  

function Notif() {
  const {list2} = useNotification();
  const [currentDate, setCurrentDate] = useState("");


  return (
    <>
  
    <div className='home'>
        <Navbar/>
        <div className='notif-main'>
                  <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nom médicament</th>
                    <th scope="col">Message</th>
                    <th scope="col">Etat</th>
                  </tr>
                </thead>
                <tbody>
           
               {list2.map((val, key) => (
                <tr key={val.id}>
                  <td>{val.designation}</td>
                  <td>Veuillez sortir ce médicament</td>
                  <td>Médicament périmé</td>
                </tr>
              ))}
                </tbody>
              </table>
        </div>
    </div>
 
    </>
  )
}

export default Notif