import React, { useEffect, useState } from 'react'
import './Modal.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import successIcon from '../../icone/check.svg'

function Modal(props) {
  const [designation,setDesignation]=useState("");
  const [prix,setPrix]=useState("");
  const [nombre,setNombre]=useState("");
  const [categorie,setCategorie]=useState("");
  const [administration,setAdministration]=useState("");
  const [idFournisseur,setIdFournisseur]=useState("");
  const [selectedDate, setSelectedDate] = useState(null);
 
  //Ajouter
  const handleAdd=()=>{
    axios.post('http://localhost:2604/post/create',
    {nombre:nombre,designation:designation,prix:prix,Date_peremption:selectedDate,idFournisseur:idFournisseur,idCategorie:categorie,idAdministration:administration})
    Swal.fire({
      title: "Félicitation!",
      text: "Ajout réussi!",
      icon:'success',
      iconHtml: `<img src="${successIcon}" style="width: 50px; height: 50px;">`, // Utilisez votre icône SVG personnalisée
      showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
      timer: 2000 
    });
  }
 
  //Liste des fournisseurs pour la select
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

    //Liste des categories pour la select
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

     //Liste des administrations pour la select
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

  // Ne pas pouvoir sélectionner des dates antérieures
  const[currentDate,setCurrentDate]=useState("");
  useEffect(()=>{
    const getDate=()=>{
      const today=new Date();
      const iso=(today.toLocaleDateString());
      setCurrentDate( new Date(iso.split('/').reverse().join('-')).toISOString().split('T')[0])
      }
      getDate();
     
 
  },[currentDate])
  
  // Obtenir liste par nom
  const[list,setList]=useState([])
  useEffect(() => {
    const showMedicine = () => {
      axios.get("http://localhost:2604/get/medicineNomList")
        .then((result) => {
          setList(result.data);
        })
    }
    showMedicine();
  }, []);

  // Select Visible
  const [selectVisible,setSelectVisible]=useState(true);
useEffect(()=>{
  if (designation === "Autre") {
    setSelectVisible(false);
    setPrix(0) // Correction de la variable à définir sur false
  } else if (designation !== "") {
    axios.get(`http://localhost:2604/get/medicineDetailList/${designation}`)
      .then((result) => {
        if (result.data.length > 0) { // Vérifier si les données sont disponibles
          setPrix(result.data[0].prix);
          setCategorie(result.data[0].idCategorie);
          setAdministration(result.data[0].idAdministration);
          setIdFournisseur(result.data[0].idFournisseur)
        } else {
          console.log("Aucune donnée trouvée pour cette désignation");
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      });
  }
  
 
},[designation,selectVisible])

 

  return (
    <>
         <div className='overlay' >
            <div className='modal-content'> 
              <form onSubmit={handleAdd}>
                <h3>Ajout d'un médicament</h3>
  
               <div className='div-form'>
                  <label>Nom médicament</label>
                  {selectVisible ?

                  <select onChange={(e)=>{setDesignation(e.target.value)}}>
                     <option> </option>
                    {list.map((val)=>(
                      <option key={val.id} value={val.designation}>{val.designation}</option>
                    ))}
                    <option value="Autre" > Autre</option>
                  </select>
                  : <input required type='text' onChange={(e)=>{setDesignation(e.target.value)}}/>
                  }  
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
                  <label>Nombre</label>
                  <input required type='number' onChange={(e)=>{setNombre(e.target.value)}}/>
                </div> 

                 <div className='div-form'>
                  <label >Date d'expiration</label>
                  <input  type="date"  value={selectedDate} min={currentDate}
                   onChange={(e)=>{setSelectedDate(e.target.value)}} />
                </div> 
                
                <div className='div-form'>
                <label>Fournisseur</label>
                  <select  value={idFournisseur} required onChange={(e)=>{setIdFournisseur(e.target.value)}}>
                  <option > </option>
                    {fournisseurList.map((val,key)=>(
                      <option key={val.idF} value={val.idF}>
                        {val.fournisseur}
                      </option>
                    ))}
                    </select>
                </div>
                
                <div className='div-form'>
                  <label>Prix Unitaire</label>
                {selectVisible?
                <input required type='number'  value={prix} readOnly/>
                :<input required type='number'   onChange={(e)=>{setPrix(e.target.value)}}/>}  
                </div>
               
                <div className='btn-form div-form'>
                   <button className='btn-modal' type='submit'>Ajouter</button>
                    <button className='btn-modal' onClick={props.handleexit}>Annuler</button> 
                </div> 

               </form>
             
            </div>
         </div>
     
    </>
  )
}

export default Modal