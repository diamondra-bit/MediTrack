import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Note from '../../components/Note/Note';
import add from '../../icone/add.svg';
import search from '../../icone/search.svg';
import Modal from '../../components/Modal/Modal';
import Modal2 from '../../components/Modal/Modal2';
import edit from '../../icone/edit.svg';
import del from '../../icone/delete.svg'

import './Inventory.css';
import Swal from 'sweetalert2';

function Inventory() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [userId, setUserId] = useState("");
  const [designation, setDesignation] = useState("");
  const [categorie, setCategorie] = useState("");
  const [administration, setAdministration] = useState("");
  const [prix, setPrix] = useState("");
  const [date_peremption, setDate_peremption] = useState("");
  const [idFournisseur, setIdFournisseur] = useState("");
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ListEtat, setListEtat] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  // Liste des médicaments 
  useEffect(() => {
    const getDate = () => {
      const today = new Date();
      setCurrentDate(today.toLocaleDateString());
    }
    getDate();
    const showMedicine = () => {
      axios.get("http://localhost:2604/get/medicineList")
        .then((result) => {
          setList(result.data);
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
      
              });
          
        })
    }
    showMedicine();
    
  }, []);
 
// Supprimer
  const handleDelete = (idDel) => {
    axios.put(`http://localhost:2604/delete/deleteMedicine/${idDel}`)
      .then(() => {
        Swal.fire({
          title: "Félicitation!",
          text: "Suppression réussi!",
          icon:'success',
           showConfirmButton: false, // Ne pas afficher de bouton de confirmation pour fermer automatiquement le SweetAlert
          timer: 2000 
        }); 
        window.location.reload();
      })
  }
// Afficher modal update
  const handleModal2=(id,design,categorie,admin,prix,dateP,idF)=>{
    setModal2(!modal2)
    setUserId(id);
    setDesignation(design);
    setCategorie(categorie)
    setAdministration(admin)
    setPrix(prix)
    setDate_peremption(dateP)
    setIdFournisseur(idF)
  }
// Barre de recherche
  const filteredList = list.filter((medicine) => {
    return medicine.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.Date_peremption.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.prix.toLowerCase().includes(searchTerm.toLowerCase())||
           medicine.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ||
           medicine.administration.toLowerCase().includes(searchTerm.toLowerCase())
           ;
  });

  const handleexit= () => {
    setModal(false)
  }
  const handleexit2= () => {
    setModal2(false)
  }

  return (
    <>
      {modal && <Modal modal={modal} handleexit={handleexit} />}
      {modal2 && <Modal2 handleexit2={handleexit2} userId={userId}  designation={designation} categorie={categorie} administration={administration} prix={prix} date_peremption={date_peremption} idFournisseur={idFournisseur} />}

      <div className='inventory'>
        <Note text="trouver la liste des médicaments classés selon leur numéro d'enregistrement." />

        <div className='table-div'>
          <div className='nav-table'>
            <div>
              <button type="button" onClick={() => setModal(!modal)} className="btn btn-primary table-btn">
                <img src={add} alt="add" />
                Ajouter
              </button>

            </div>

            <div>
              <div className='Nav-Searchbar'>
                <img src={search} alt="search" className='icone' />
                <input type='search' placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <table className="table table-striped" >
            <thead>
              <tr>
                <th scope="col">Numéro</th>
                <th scope="col">Désignation</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Administration</th>
                <th scope="col">Date peremption</th>
                <th scope="col">Fournisseur</th>
                <th scope="col">Prix Unitaire</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((val, key) => (
            
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.designation}</td>
                  <td>{val.categorie}</td>
                  <td>{val.administration}</td>
                  <td>{val.Date_peremption}</td>
                  <td>{val.fournisseur}</td>
                  <td>{val.prix}</td>
                  <td>
                    <button onClick={() => handleModal2(val.id,val.designation,val.idC,val.idA, val.prix, val.Date_peremption, val.idF)}>
                      <img src={edit}/>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(val.id)}>
                      <img src={del}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Inventory;
