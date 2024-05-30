import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import successIcon from '../../icone/check.svg'

function Modal2(props) {
    
    const [designation,setDesignation]=useState(props.designation);
    const [prix,setPrix]=useState(props.prix);
    const [date_peremption,setDate_peremption]=useState(props.date_peremption);
    const[idFournisseur,setIdFournisseur]=useState(props.idFournisseur)
    const[categorie,setCategorie]=useState(props.categorie)
    const[administration,setAdministration]=useState(props.administration)

        const handleUpdate=()=>{    
            axios.put(`http://localhost:2604/put/modifyMedicine/${props.userId}`,
            {designation:designation,prix:prix,Date_peremption:date_peremption,idFournisseur:idFournisseur,idCategorie:categorie,idAdministration:administration
            })
            Swal.fire({
              title: "Félicitation!",
              text: "Modification réussi!",
              icon:'success',
              iconHtml: `<img src="${successIcon}" style="width: 50px; height: 50px;">`, // Utilisez votre icône SVG personnalisée
              showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
              timer: 2000 
            });
        }
 
        // Fournisseur liste
        const [fournisseurList,setFournisseurList]=useState([]);
        useEffect(()=>{
          const list=()=>{
            axios.get("http://localhost:2604/get/fournisseurList")
            .then((response)=>(
              setFournisseurList(response.data)
            ))
          }
          list();
        },[])

        // Categorie liste
        const [categorieList,setCategorieList]=useState([]);
        useEffect(()=>{
          const list=()=>{
            axios.get("http://localhost:2604/get/categorie")
            .then((response)=>(
              setCategorieList(response.data)
            ))
          }
          list();
        },[])

            // Administration liste
            const [administrationList,setAdministrationList]=useState([]);
            useEffect(()=>{
              const list=()=>{
                axios.get("http://localhost:2604/get/administration")
                .then((response)=>(
                  setAdministrationList(response.data)
                ))
              }
              list();
            },[])

    //Récuperer currentDate
  const[currentDate,setCurrentDate]=useState("");

  useEffect(()=>{
    const getDate=()=>{
      const today=new Date();
      const iso=(today.toLocaleDateString());
      setCurrentDate( new Date(iso.split('/').reverse().join('-')).toISOString().split('T')[0])
      }
      getDate();
       

  },[currentDate,date_peremption])
  
  
  return (
    <>
   <div className='overlay' >
            <div className='modal-content'> 
              <form onSubmit={handleUpdate}>
                <h3>Modification d'un médicament</h3>
                 
               <div className='div-form'>
                  <label>Nom médicament</label>
                  <input required type='text' value={designation} onChange={(e)=>{setDesignation(e.target.value)}}/>
                </div> 

                <div className='div-form'>
                <label>Categorie</label>
                  <select value={categorie} required onChange={(e)=>{setCategorie(e.target.value)}}>
                  <option > </option>
                    {categorieList.map((val,key)=>(
                      <option key={val.idC} value={val.idC}>
                        {val.categorie}
                      </option>
                    ))}
                    </select>
                   </div>

                   <div className='div-form'>
                    <label> Administration</label>
                  <select value={administration} required onChange={(e)=>{setAdministration(e.target.value)}}>
                  <option > </option>
                    {administrationList.map((val,key)=>(
                      <option key={val.idA} value={val.idA}>
                        {val.administration}
                      </option>
                    ))}
                    </select>
                   </div>

                <div className='div-form'>
                  <label>Prix Unitaire</label>
                  <input required type='text' value={prix} onChange={(e)=>{setPrix(e.target.value)}} />
                </div> 

                 <div className='div-form'>
                  <label>Date d'expiration</label>
                  <input required type='date' min={currentDate}  value={date_peremption} onChange={(e)=>{setDate_peremption(e.target.value)}} />
                </div> 
                
                <div className='div-form'>
                <label>Fournisseur</label>
                <select required value={idFournisseur} onChange={(e)=>{setIdFournisseur(e.target.value)}}>
                  <option > </option>
                    {fournisseurList.map((val,key)=>(
                      <option key={val.idF} value={val.idF}>
                        {val.fournisseur}
                      </option>
                    ))}
                  </select>
                </div>
               
                <div className='btn-form div-form'>
                   <button className='btn-modal' type='submit'>Modifier</button> 
                   <button className='btn-modal'onClick={props.handleexit2}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
    </>
  )
}

export default Modal2