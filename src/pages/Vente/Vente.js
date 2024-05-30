import React, { useEffect, useState } from 'react'
import './Vente.css'
import axios from 'axios';
import Note from '../../components/Note/Note'
import ModalPdf from '../../components/Modal/ModalPdf';

function Vente() {
  const [list,setList]=useState([]);
  useEffect(() => {
    const showMedicine = () => {
      axios.get("http://localhost:2604/get/medicineNomList")
        .then((result) => {
          setList(result.data);
        })
    }
    showMedicine();
  }, []);


  const[designation,setDesignation]=useState("");
  const[prix,setPrix]=useState("");
  const[stock,setStock]=useState("");
  const[nombre,setNombre]=useState("");
  const[monnaie,setMonnaie]=useState("");
  const[reste,setReste]=useState("");
  const[total,setTotal]=useState("");
  const [ListEtat, setListEtat] = useState([]);

  const[error1,setError1]=useState(false)
  const[error2,setError2]=useState(false)
  const[error,setError]=useState(false)

  const[modalPdf,setModalPdf]=useState(false);
 
  useEffect(()=>{
    if (designation!=="")
    {
      const obtain = () => 
      {
        axios.get(`http://localhost:2604/get/medicineDetailList/${designation}`)
        .then((result) => {
          setPrix(result.data[0].prix)
          setStock(result.data[0].stock)
        // Nombre stock ne peut pas dépasser la quantité en stock
           if (nombre>stock||nombre<0){
              setError1(true)
           }else{
              setError1(false)
              setTotal(prix*nombre);
           }

          // Total à payer
          // Monnaie
          if (monnaie !==""){
            if (total>monnaie){
              setError2(true)
          }else{
              setError2(false)
              setReste(monnaie -total)
          }
          }

          //  Error
          if(error1 || error2){
            setError(true)
          }else{
            setError(false);
          }

        })
      }
     
      obtain();
    }
   
  },[designation,error,error1,error2,total,nombre,prix,monnaie,reste])
  
  const generatePDF=()=> {
  setModalPdf(!modalPdf)
  }
  const handle = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2604/post/createVente", {
      medicament: designation, prix: prix, nombre: nombre, total: total, monnaie: monnaie, reste: reste
    })
    .then(()=>(
        // Modifier état du stock
        axios.get("http://localhost:2604/get/notification")
        .then((result) => {
          setListEtat(result.data);   

          if (result.data.length > 0) {
            for (let i = 0; i < result.data.length; i++) {
              if (result.data[i].stock <= 3) {
                axios.put("http://localhost:2604/put/modifyEtat", {
                  etat: "Rupture de Stock",
                  designation: result.data[i].designation
                });
              } else {
                axios.put("http://localhost:2604/put/modifyEtat", {
                  etat: "Stock Normale",
                  designation: result.data[i].designation
                });
              }
            }
          }

        })
    ))
    
    generatePDF();

    axios.put(`http://localhost:2604/delete/deleteVente/${designation}`, { nombre: Number(nombre )})


    .catch((error) => {
      console.error("Erreur lors de la suppression de la vente :", error);
      });

  }
  const handleExit2=()=> {
window.location.reload();
  }

  return (
    <>
    {modalPdf && <ModalPdf  designation={designation}
    prix={prix}
    nombre={nombre}
    total={total}
    monnaie={monnaie}
    reste={reste}
    />}
        {/* <Note text="enregistrer l'achat des médicaments en toute simplicité"/> */}
        <div className='vente'> 
              <form onSubmit={handle}>
                <h5>Achat de médicament</h5>

               <div className='div-form'>
               <label>Nom</label>
                  <select onChange={(e) =>setDesignation(e.target.value)}>
                    <option></option>
                    {list.map((val)=>(
                      <option key={val.id} value={val.designation}>{val.designation}</option>
                    ))}
                  </select>
                </div> 

                <div className='div-form'>
                  <label>Prix Unitaire</label>
                  <input type='number' required value={prix} readOnly/>
                </div> 

                <div className='div-form'>
                  <label>Quantité en stock</label>
                  <input type='text' required value={stock} readOnly/>
                </div>

                {error1&& <p className='error'>Veuillez vérifier la saisie</p>}
                <div className='div-form'>
                  <label>Nombre</label> 
                  <input type='number' required  onChange={(e) =>setNombre(e.target.value)} />
                </div> 

                <div className='div-form'>
                  <label>Total</label>
                  <input type='number' required value={total} readOnly/>
                </div> 

                {error2&& <p className='error'>Monnaie ne peut pas être inférieure au prix </p>}
                <div className='div-form'>
                  <label>Monnaie</label>
                  <input type='number' required onChange={(e) =>setMonnaie(e.target.value)}/>
                </div> 

                <div className='div-form'>
                  <label>Reste</label>
                  <input type='number' required readOnly value={reste}/>
                </div> 
               
                <div className='btn-form div-form'>
                    {!error&&<button className='btn-modal' type='submit' >Valider</button>}
                    <button className='btn-modal' onClick={handleExit2}>Annuler</button> 
                </div> 

               </form>
             
            </div>
    </>
  )
}

export default Vente