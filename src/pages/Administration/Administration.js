import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Note from '../../components/Note/Note';
import add from '../../icone/add.svg';
import edit from '../../icone/edit.svg';
import del from '../../icone/delete.svg'
import search from '../../icone/search.svg';
import ModalA from '../../components/Modal/ModalA';
import ModalA2 from '../../components/Modal/ModalA2';
import Swal from 'sweetalert2'

function Administration() {
  
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [administration,setAdministration] = useState("");
    const [numero, setNumero] = useState("");
    
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    // Liste des médicaments 
    useEffect(() => {
      const showadministration = () => {
        axios.get("http://localhost:2604/get/administration")
          .then((result) => {
            setList(result.data);
                     
          })
      }
      showadministration();
    }, []);
   
  // Supprimer
    const handleDelete = (idDel) => {
      axios.put(`http://localhost:2604/delete/deleteAdministration/${idDel}`)
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
    const handleModalA2=(id,administration)=>{
      setModal2(!modal2)
      setNumero(id)
     setAdministration(administration);
    }
  // Barre de recherche
    const filteredList = list.filter((medicine) => {
      return medicine.administration.toLowerCase().includes(searchTerm.toLowerCase()) ;
    });
  const handleexit= () => {
    setModal(false)
  }
  const handleexit2= () => {
    setModal2(false)
  }
  
  return (
    <>
   {modal && <ModalA handleexit={handleexit}/> }
   {modal2 && <ModalA2 numero={numero} administration={administration} handleexit2={handleexit2}/> }
    <div className='inventory'>
      <Note text="trouver la liste des voies d'administration des médicaments" />

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
              <th scope="col">Voie d'administration</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((val, key) => (
          
              <tr key={val.idA}>
                <td>{val.idA}</td>
                <td>{val.administration}</td>
                <td>
                  <button onClick={() => handleModalA2(val.idA,val.administration)}>
                    <img src={edit}/>
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(val.idA)}>
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


export default Administration