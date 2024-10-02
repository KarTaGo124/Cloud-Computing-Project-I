import { useContext, useMemo, useState } from "react";
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
import { CartContext } from "../contexts/CartContext";
import { Header } from "../components/Header";
import { postOrder } from "../services/order";
import { useUser } from "../contexts/UserContext";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext?.cartItems || [];
  const { id } = useUser();
  const total = useMemo(() => {
    return cartContext?.getCartTotal() || 0;
  }, [cartContext]);

  const placeOrder = async () => {
    console.log("Placing order:", cartItems);
    postOrder(id, cartItems);
    alert("Order placed successfully!");
    cartContext?.clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header />
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-300">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4 bg-gray-800 shadow-lg">
                <CardBody className="flex flex-row items-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-100">
                      {item.name}
                    </h2>
                    <p className="text-gray-300">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => cartContext?.removeFromCart(item.id)}
                      className="bg-gray-700 text-gray-100"
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity.toString()}
                      onChange={(e) =>
                        cartContext?.updateQuantity(
                          item.id,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-16 mx-2"
                      classNames={{
                        input: "text-gray-900 bg-gray-300",
                        inputWrapper: "bg-gray-300",
                      }}
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={() => cartContext?.addToCart(item)}
                      className="bg-gray-700 text-gray-100"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    onPress={() => cartContext?.deleteItem(item.id)}
                    className="ml-4"
                  >
                    <Trash2 size={18} />
                  </Button>
                </CardBody>
              </Card>
            ))}
            <Card className="bg-gray-800 shadow-lg">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-100">
                  Order Summary
                </h2>
              </CardHeader>
              <Divider className="bg-gray-700" />
              <CardBody>
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-100">
                  <span>Total:</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
              </CardBody>
              <Divider className="bg-gray-700" />
              <CardFooter>
                <Button
                  color="primary"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
