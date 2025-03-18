import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Product from "./components/Product";
function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductView, setShowProductView] = useState(false);
  const handleCreateProduct = () => {
    setShowProductView(true);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setIsLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setMessage("Error al obtener los datos");
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div>
      {!showProductView && (
        <div className="App">
          <h1 style={{ "margin-left": "auto", "margin-right": "auto", display: 'block' }} >PRODUCTOS</h1>
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
                  <button style={{ backgroundColor: 'red' }}>Delete</button>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleCreateProduct} style={{ "margin-left": "auto", "margin-right": "auto", display: 'block' }} >Create</button>`
        </div>
      )}
      {showProductView && (
        <Product />// Renderiza el componente que muestra el HTML de Product
      )}
    </div>
  );
}
export default App;