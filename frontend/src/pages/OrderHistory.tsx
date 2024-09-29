import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import axios from "axios";

type OrderProduct = {
  product_id: string;
  quantity: number;
};

type Order = {
  id: number;
  customer_id: number;
  order_date: Date;
  status: string;
};

const columns = [
  {
    key: "id",
    label: "Order ID",
  },
  {
    key: "order_date",
    label: "Date",
  },
  {
    key: "state",
    label: "Status",
  },
];

const getAllOrders = async (user_id: number) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/orders/customer/${user_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrdersProducts = async (order_id: number) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/orders/${order_id}/products`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Record<number, OrderProduct[]>>({});

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const allOrders = await getAllOrders(1);
        if (allOrders?.data) setOrders(allOrders.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const fetchAllOrdersProducts = async () => {
        try {
          const productPromises = orders.map(async (order) => {
            const res = await getAllOrdersProducts(order.id);
            return { orderId: order.id, products: res?.data || [] };
          });

          const resolvedProducts = await Promise.all(productPromises);
          const productsMap = resolvedProducts.reduce((acc, curr) => {
            acc[curr.orderId] = curr.products;
            return acc;
          }, {} as Record<number, OrderProduct[]>);

          setProducts(productsMap);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAllOrdersProducts();
    }
  }, [orders]);

  console.log(orders);
  console.log(products);

  return (
    <div className="space-y-4 p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Order History
      </h1>
      <Table
        aria-label="Order history table"
        shadow="lg"
        className="rounded-lg overflow-hidden"
        classNames={{
          base: "bg-gray-900",
          th: "bg-gray-800 text-gray-300 font-bold border-b border-gray-700",
          td: "py-3 text-gray-300 border-b border-gray-700",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn align="center" key={column.key}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={orders}>
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:bg-gray-800 transition-colors"
            >
              {(columnKey) => (
                <TableCell className="text-center">
                  {columnKey === "order_date" ? (
                    new Date(getKeyValue(item, columnKey)).toLocaleDateString()
                  ) : columnKey === "state" ? (
                    getKeyValue(item, columnKey) == 1 ? (
                      <span className="text-green-400 font-semibold">
                        Delivered
                      </span>
                    ) : (
                      <span className="text-yellow-400 font-semibold">
                        Pending
                      </span>
                    )
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-6">
        <Button color="primary">Previous</Button>
        <span className="text-gray-600">
          Page {1} of {10}
        </span>
        <Button color="primary">Next</Button>
      </div>
    </div>
  );
}
