const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint para obtener el recibo completo de una orden
app.get('/orchestrator/orders/:orderId/receipt', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    // 1. Obtener la orden con los productos relacionados desde el microservicio de órdenes
    const orderResponse = await axios.get(`http://api-order:8000/orders/${orderId}/products`);
    const orderProducts = orderResponse.data;  // Array con product_id y quantity

    if (!orderProducts || orderProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this order' });
    }

    // 2. Obtener detalles de cada producto desde el microservicio de productos
    const productDetailsPromises = orderProducts.map(async (orderProduct) => {
      const productResponse = await axios.get(`http://product-backend:8080/products/${orderProduct.product_id}`);
      const product = productResponse.data;
      return {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: orderProduct.quantity,
        total: product.price * orderProduct.quantity
      };
    });

    const productDetails = await Promise.all(productDetailsPromises);

    // 3. Calcular el precio total de la orden
    const totalPrice = productDetails.reduce((sum, product) => sum + product.total, 0);

    // 4. Obtener información del usuario desde el microservicio de usuarios
    const customerId = orderProducts[0].customer_id;  // Asume que el primer resultado tiene la información del usuario
    const userResponse = await axios.get(`http://user-backend:8081/users/${customerId}`);
    const user = userResponse.data;

    // 5. Retornar el recibo detallado
    res.json({
      orderId: orderId,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      products: productDetails,
      totalPrice: totalPrice
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el recibo', error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Orchestrator running on http://localhost:${port}`);
});
