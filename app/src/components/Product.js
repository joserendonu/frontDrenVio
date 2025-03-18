import React, { useState, useRef } from 'react';

function Product() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!formRef.current) {
       console.error("El formulario no está referenciado correctamente.");
       return;
    }

    const form = formRef.current;
    const formData = {
        name: form.name.value,
        description: form.description.value,
        stock: form.stock.value,
        paralelo: form.paralelo.value,
        brand: form.brand.value,
        image: form.image.value
      };
    
    setFormData(formData)

    try {
      const response = await fetch('http://localhost:3000/prod', {
        method: 'POST',
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
    window.location.href = "http://localhost:8001"; 
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
      
        <div className='form-group'>
          <label>Nombre</label>
          <input type='text' name='name' required />
        </div>
        
        <div className='form-group'>
          <label>Descripción</label>
          <input type='text' name='description' required />
        </div>

        <div className='form-group'>
          <label>Stock</label>
          <input type='number' name='stock' required />
        </div>

        <div className='form-group'>
          <label>Paralelo</label>
          <input type='number' name='paralelo'  required/>
        </div>
        <div className='form-group'>
          <label>Marca</label>
          <input type='text' name='brand'  required />
        </div>
        <div className='form-group'>
          <label>Imagen</label>
          <input type='text' name='image'  required/>
        </div>

        <button type='submit'>Crear Producto</button>
      </form>
    </>
  );
}

export default Product;