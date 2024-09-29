import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
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
import { useNavigate } from "react-router";
import axios from "axios";

type OrderProduct = {
  product_id: string;
  quantity: number;
};

type Order = {
  id: number;
  customer_id: number;
  order_date: Date;
  state: number;
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
    key: "products",
    label: "Products",
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
  const [orders, setOrders] = useState<Order[]>();
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const allOrders = await getAllOrders(1);
        setOrders(allOrders?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllOrdersProducts = async () => {
      try {
        const prod: OrderProduct[] = [];
        orders?.forEach(async (order) => {
          const allOrdersProducts = await getAllOrdersProducts(order.id);
          prod.push(allOrdersProducts?.data);
        });
        setProducts(prod);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
    fetchAllOrdersProducts();
  });

  console.log(orders);
  console.log(products);
  return (
    <div className="space-y-4">
      {/* <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">Search</Button>
      </form> */}

      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={orders}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <Button>Previous</Button>
        <span>
          Page {1} of {10}
        </span>
        <Button>Next</Button>
      </div>
    </div>
  );
}
