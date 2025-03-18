import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Product from "./components/Product";
import UProduct from "./components/UProduct";

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductView, setShowProductView] = useState(false);
  const [showUProductView, setshowUProductView] = useState(false);

  const handleCreateProduct = () => {
    setShowProductView(true);
  };
  const handleUpdateProduct = () => {
    setshowUProductView(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/delet/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Producto creado', data);
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
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
      {!showProductView && !showUProductView && (
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
                  <button onClick={handleUpdateProduct}>Update</button>
                  <br></br>
                  <button onClick={() => handleDeleteProduct(product._id)} style={{ backgroundColor: 'red' }}>Delete</button>
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
      {showUProductView && (
        <UProduct />// Renderiza el componente que muestra el HTML de Product
      )}
    </div>
  );
}
export default App;