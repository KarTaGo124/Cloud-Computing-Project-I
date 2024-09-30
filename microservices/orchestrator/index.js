const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.config');
const cors = require('cors');
const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /orchestrator/orders/{orderId}/receipt:
 *   get:
 *     summary: Obtener el recibo completo de una orden
 *     tags: [Orders]
 *     description: Este endpoint obtiene todos los detalles de una orden, incluidos los productos y la información del usuario.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Recibo de la orden obtenido exitosamente
 *       404:
 *         description: Orden no encontrada o no tiene productos
 *       500:
 *         description: Error al obtener el recibo
 */
app.get('/orchestrator/orders/:orderId/receipt', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orderInfoResponse = await axios.get(`http://api-order:8000/orders/${orderId}`);
    const orderInfo = orderInfoResponse.data; 

    const orderProductsResponse = await axios.get(`http://api-order:8000/orders/${orderId}/products`);
    const orderProducts = orderProductsResponse.data; 

    if (!orderProducts || orderProducts.length === 0) {
      return res.status(404).json({ message: 'No products found for this order' });
    }

    const productDetailsPromises = orderProducts.map(async (orderProduct) => {
      const productResponse = await axios.get(`http://product-backend:8080/products/${orderProduct.product_id}`);
      const product = productResponse.data;
      return {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: orderProduct.quantity,
        imageUrl: product.imageUrl,
        category: product.category,
        total: product.price * orderProduct.quantity
      };
    });

    const productDetails = await Promise.all(productDetailsPromises);

    const totalPrice = productDetails.reduce((sum, product) => sum + product.total, 0);

    const customerId = orderInfo.customer_id;  
    const userInfoResponse = await axios.get(`http://user-backend:8081/users/${customerId}`);
    const userInfo = userInfoResponse.data;

    const userProfileInfoResponse = await axios.get(`http://user-backend:8081/profile/${customerId}`);
    const userProfileInfo = userProfileInfoResponse.data;

    res.json({
      order: {
        id: orderId,
        order_date: orderInfo.order_date,
        status: orderInfo.status
      },
      user: {
        id: userInfo.id,
        username: userInfo.username,
        email: userInfo.email,
        first_name: userProfileInfo.first_name,
        last_name: userProfileInfo.last_name,
        phone_number: userProfileInfo.phone_number,
        address: userProfileInfo.address,
        country: userProfileInfo.country
      },
      products: productDetails,
      totalPrice: totalPrice
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el recibo', error: error.message });
  }
});

/**
 * @swagger
 * /orchestrator/users/{userId}/favorites:
 *   get:
 *     summary: Obtener productos favoritos de un usuario
 *     tags: [FavoritesProducts]
 *     description: Este endpoint obtiene los productos favoritos de un usuario, incluyendo los detalles de cada producto.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Productos favoritos obtenidos exitosamente
 *       404:
 *         description: No se encontraron productos favoritos para este usuario
 *       500:
 *         description: Error al obtener los productos favoritos
 */
app.get('/orchestrator/users/:userId/favorites', async (req, res) => {
  const userId = req.params.userId;
  try {
    const favProductsResponse = await axios.get(`http://user-backend:8081/favProducts/${userId}`);
    const favProducts = favProductsResponse.data;

    if (!favProducts || favProducts.length === 0) {
      return res.status(404).json({ message: 'No favorite products found for this user' });
    }

    const productDetailsPromises = favProducts.map(async (favProduct) => {
      const productResponse = await axios.get(`http://product-backend:8080/products/${favProduct.product_id}`);
      const product = productResponse.data;
      return {
        product_id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      };
    });

    const productDetails = await Promise.all(productDetailsPromises);

    res.json({
      userId: userId,
      favoriteProducts: productDetails
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos favoritos', error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Orchestrator running on http://localhost:${port}`);
});
