import React, { useState, useRef } from 'react';

function UProduct() {
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
            price: form.price.value,
            stock: form.stock.value,
            image: form.image.value,
            basePrice: form.basePrice.value,
            brand: form.brand.value,
            sku: form.sku.value
     
        };

        setFormData(formData)

        try {
            const response = await fetch('http://localhost:3000/updp/'+form.id.value, {
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
        window.location.href = "http://localhost:8001";
    };

    return (
        <>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className='form-group'>
                    <label>ID</label>
                    <input type='text' name='id' required />
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
        </>
    );
}

export default UProduct;