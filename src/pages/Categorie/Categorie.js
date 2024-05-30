import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Note from '../../components/Note/Note';
import add from '../../icone/add.svg';
import edit from '../../icone/edit.svg';
import del from '../../icone/delete.svg'

import search from '../../icone/search.svg';
import ModalC from '../../components/Modal/ModalC';
import ModalC2 from '../../components/Modal/ModalC2';

import Swal from 'sweetalert2';

function Categorie() {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [categorie, setCategorie] = useState("");
    const [numero, setNumero] = useState("");
    
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    // Liste des médicaments 
    useEffect(() => {
      const showCategorie = () => {
        axios.get("http://localhost:2604/get/categorie")
          .then((result) => {
            setList(result.data);
              console.log(result.data)        
          })
      }
      showCategorie();
    }, []);
   
  // Supprimer
    const handleDelete = (idDel) => {
      axios.put(`http://localhost:2604/delete/deleteCategorie/${idDel}`)
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
    const handleModalC2=(id,categorie)=>{
      setModal2(!modal2)
      setNumero(id)
      setCategorie(categorie);
    }
  // Barre de recherche
    const filteredList = list.filter((medicine) => {
      return medicine.categorie.toLowerCase().includes(searchTerm.toLowerCase()) ;
    });

    const handleExit= () => {
      setModal(false)
    }
    const handleExit2= () => {
      setModal2(false)
    }
  
  return (
    <>
   {modal && <ModalC handleExit={handleExit}/> }
   {modal2 && <ModalC2 numero={numero} categorie={categorie} handleExit2={handleExit2}/> }
    <div className='inventory'>
      <Note text="trouver la liste des catégories ou les familles des médicaments." />

      <div className='table-div'>
        <div className='nav-table'>
          <div>
            <button type="button" onClick={() => setModal(!modal)}   className="btn btn-primary table-btn">
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
              <th scope="col">Famille de médicament</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((val, key) => (
          
              <tr key={val.idC}>
                <td>{val.idC}</td>
                <td>{val.categorie}</td>
                <td>
                  <button onClick={() => handleModalC2(val.idC,val.categorie)}>
                    <img src={edit}/>
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(val.idC)}>
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

export default Categorie