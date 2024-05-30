  
 const [list1,setList1]=useState([]);
 const [list2,setList2]=useState([]);
 const [list,setList]=useState([]);
 const [ListEtat,setListEtat]=useState([]);
 const [length,setLength]=useState(0);
 const [currentDate,setCurrentDate]=useState("")
 const [dateP,setDateP]=useState('2024-04-11');



 const [totalNotifications, setTotalNotifications] = useState(0);

 useEffect(() => {
   // Calculer la somme des notifications
   const total = list1.length + list2.length;
   setTotalNotifications(total);
   console.log(totalNotifications)
 }, [list1, list2,totalNotifications]);

   // Liste des médicaments 
   useEffect(() => {
    const getDate=()=>{
      const today=new Date();
      setCurrentDate(today.toLocaleDateString());
        }
      getDate();
      
     const showMedicine = () => {
      axios.get("http://localhost:2604/get/notification")
        .then((result) => {
          setListEtat(result.data);   
          console.log(result.data[0]) 
          if (result.data.length>0){
            for (let i=0;i<=ListEtat.length;i++){
              if(result.data[i].stock<=3){
                  axios.put("http://localhost:2604/put/modifyEtat",
                  {etat:"Rupture de Stock",designation:result.data[i].designation})
               }else{
                 axios.put("http://localhost:2604/put/modifyEtat",
                 {etat:"Stock Normale",designation:result.data[i].designation})
               }     
            }
          } 
       
        })
     
        axios.get(`http://localhost:2604/get/notificationEtat`)
        .then((result) => {
          setList1(result.data);     
        })

        axios.get(`http://localhost:2604/get/notificationDate/${dateP}`)
        .then((result) => {
          setList2(result.data);     
        })

    }
    showMedicine();

  }, [currentDate,list]);