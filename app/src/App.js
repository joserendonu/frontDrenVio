import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() { // Se agrega el async a la función fetchData
        try {
        const response = await axios.get('http://localhost:3000/getData');
        setMessage(response.data.message); 
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setMessage('Error al obtener los datos');
      }
    };

    fetchData();
  }, []);


  return (
    <div className="App">
        {message}
    </div>
  );
}

export default App;