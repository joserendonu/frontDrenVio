import React, { useEffect } from 'react';
function Product() {
    useEffect(() => {
        document.getElementById('product-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const form = event.target;

            const data = {
                name: form.name.value,
                description: form.description.value,
                stock: parseInt(form.stock.value),
                basePrice: parseFloat(form.basePrice.value),
                brand: form.brand.value,
                sku: form.sku.value,
                image: form.image.value,
            };

            fetch("http://localhost:3000/prod", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Producto creado:", data);
                })
                .catch(error => {
                    console.error('Error al crear el producto:', error);
                });

            form.reset();
        });
    }, []);
    return (
        <div class="product-card">
            <h2>Crear Nuevo Producto</h2>
            <form id="product-form">
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div class="form-group">
                    <label for="description">Descripción:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="stock">Stock:</label>
                    <input type="number" id="stock" name="stock" required />
                </div>
                <div class="form-group">
                    <label for="basePrice">Precio Base:</label>
                    <input type="number" id="basePrice" name="basePrice" step="0.01" required />
                </div>
                <div class="form-group">
                    <label for="brand">Marca:</label>
                    <input type="text" id="brand" name="brand" required />
                </div>
                <div class="form-group">
                    <label for="sku">SKU:</label>
                    <input type="text" id="sku" name="sku" required />
                </div>
                <div class="form-group">
                    <label for="imageUrl">URL de la Imagen:</label>
                    <input type="text" id="imageUrl" name="imageUrl" required />
                </div>

                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
}

export default Product;
