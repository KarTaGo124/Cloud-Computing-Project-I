const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

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
