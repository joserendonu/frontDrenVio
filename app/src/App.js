import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import './App.css';
import Product from "./components/Product";
import UProduct from "./components/UProduct";
var idtoupdate = 0;

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductView, setShowProductView] = useState(false);
  const [showUProductView, setshowUProductView] = useState(false);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const handleCreateProduct = () => {
    setShowProductView(true);
  };
  const handleUpdateProduct = (id) => {
    idtoupdate = id;
    setshowUProductView(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:3000/delet/' + id, {
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


  // NUEVO CODIGO
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("*******************************")
    console.log(idtoupdate)
    if (!formRef.current) {
      console.error("El formulario no está referenciado correctamente.");
      return;
    }

    const form = formRef.current;
    const formData = {
      name: form.name.value,
      description: form.description.value,
      price: form.price.value,
      stock: form.stock.value,
      image: form.image.value,
      basePrice: form.basePrice.value,
      brand: form.brand.value,
      sku: form.sku.value

    };

    setFormData(formData)

    try {
      const response = await fetch('http://localhost:3000/updp/' + idtoupdate, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Producto creado', data);
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
    form.reset();
    // window.location.href = "http://localhost:8001";
  };
  // FIN NUEVO CODIGO

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
                  <button onClick={() => handleUpdateProduct(product._id)}>Update</button>
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
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className='form-group'>
            <label>ID</label>
            <input type='text' name='id' required value={idtoupdate} disabled/>
          </div>
          <div className='form-group'>
            <label>Nombre</label>
            <input type='text' name='name' required />
          </div>

          <div className='form-group'>
            <label>Descripción</label>
            <input type='text' name='description' required />
          </div>
          <div className='form-group'>
            <label>Precio</label>
            <input type='number' name='price' required />
          </div>
          <div className='form-group'>
            <label>Stock</label>
            <input type='number' name='stock' required />
          </div>
          <div className='form-group'>
            <label>Imagen</label>
            <input type='text' name='image' required />
          </div>
          <div className='form-group'>
            <label>Base price</label>
            <input type='number' name='basePrice' required />
          </div>
          <div className='form-group'>
            <label>Marca</label>
            <input type='text' name='brand' required />
          </div>
          <div className='form-group'>
            <label>Sku</label>
            <input type='text' name='sku' required />
          </div>


          <button type='submit'>Actualizar Producto</button>
        </form>
      )}
    </div>
  );
}
export default App;