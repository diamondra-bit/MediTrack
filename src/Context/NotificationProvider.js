import React ,{ createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';


const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {

  const [totalNotifications, setTotalNotifications] = useState(0);
     const [list2, setList2] = useState([]);

  // Total notification
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get('http://localhost:2604/get/notificationDate');
        setList2(response2.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);
  
  useEffect(() => {
    const total =  list2.length;
    setTotalNotifications(total);
  }, [ list2]);


  return (
    <NotificationContext.Provider value={{ totalNotifications, setTotalNotifications,list2,setList2 }}>
      {children}
    </NotificationContext.Provider>
  )
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
