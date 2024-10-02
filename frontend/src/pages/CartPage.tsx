"use client";

import { useContext, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { Product as ProductInterface } from "../interfaces/product";
import { CartContext } from "../contexts/CartContext";
import { Header } from "../components/Header";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];

  const addToCart = (product: ProductInterface) => {
    const cartItem = { ...product, quantity: 0 };
    cartContext?.addToCart(cartItem);
  };

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const placeOrder = () => {
    // In a real application, you would send the order to your backend
    console.log("Placing order:", cartItems);
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardBody className="flex flex-row items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button size="sm" variant="flat">
                      Delete
                    </Button>
                    <Input type="number" value={item.quantity.toString()} />
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => addToCart(item)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    className="ml-4"
                  >
                    <Trash2 size={18} />
                  </Button>
                </CardBody>
              </Card>
            ))}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  color="primary"
                  size="lg"
                  className="w-full"
                  onPress={placeOrder}
                >
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
