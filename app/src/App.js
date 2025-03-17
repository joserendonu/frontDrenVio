import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');


  useEffect(() => {
    async function fetchData() { // Se agrega el async a la función fetchData
      try {
        const response = await axios.get('http://localhost:3000/getData');
        setMessage(response.data.message);
      } catch (error) {
        console.log("****************ddddddddd*************************")

        console.error('Error al obtener los datos:', error);
        setMessage('Error al obtener los datos');
      }
    };

    async function fetchProducts() { // Se agrega el async a la función fetchData
      try {
        const response = await axios.get('http://localhost:3000/products');
        console.log("*********************rrrrrrrr********************")
        console.log(response.data[0])
        setData(response.data[0]._id);
      } catch (error) {
        console.log("*****************************************")

        console.error('Error al obtener los datos:', error);
        setData('Error al obtener los datos');
      }
    };
    fetchProducts();
    fetchData();
  }, []);



  return (
    <div className="App">
      data{message}
      products{data}
    </div>
   
  );
}

export default App;