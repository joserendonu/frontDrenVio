// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'


// function App() {
//   const [message, setMessage] = useState('');
//   const [data, setData] = useState('');


//   useEffect(() => {
//     async function fetchData() { 
//       try {
//         const response = await axios.get('http://localhost:3000/getData');
//         setMessage(response.data.message);
//       } catch (error) {
//         console.log("****************ddddddddd*************************")

//         console.error('Error al obtener los datos:', error);
//         setMessage('Error al obtener los datos');
//       }
//     };

//     async function fetchProducts() { 
//       try {
//         const response = await axios.get('http://localhost:3000/products');
//         console.log("*********************rrrrrrrr********************")
//         console.log(response.data[0])
//         setData(response.data);
//       } catch (error) {
//         console.log("*****************************************")

//         console.error('Error al obtener los datos:', error);
//         setData('Error al obtener los datos');
//       }
//     };
//     fetchProducts();
//     fetchData();
//   }, []);

//   function Product({ product }) {
//     return (
//       <div className="product">
//         <h3>{product.name}</h3>
//         <p>{product.description}</p>
//       </div>
//     )
//   }

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//       <div className="products-grid">
//         {products.map((product) => (
//           <Product key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/products');
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setMessage("Error al obtener los datos");
    } finally {
      setIsLoading(false)
    }
  };

  function Product(props) {
    const { product } = props;
    return (
      <div className="product">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
      </div>
    );
  }

  return (
    <div className="App">
       <h1 style={{"margin-left":"auto","margin-right":"auto" ,  display:'block'}} >PRODUCTOS</h1>
      {message &&
        <div className="error-message">{message}</div>
      }
      {isLoading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <button>Update</button>
              <br></br>
              <button style={{backgroundColor:'red'}}>Delete</button>
            </div>
          ))}

        </div>

      )}
      <button style={{"margin-left":"auto","margin-right":"auto" ,  display:'block'}} >Create</button>`
    </div>
  );
}

export default App;