import { useEffect, useState } from "react";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	getKeyValue,
} from "@nextui-org/table";
import {
	Modal,
	ModalBody,
	ModalContent,
	useDisclosure,
} from "@nextui-org/react";
import { useUser } from "../contexts/UserContext";
import { Header } from "../components/Header";
import { Order, OrderProduct } from "../interfaces/order";
import { getAllOrders, getAllOrdersProducts } from "../services/order";

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

export default function OrderHistory() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [products, setProducts] = useState<Record<number, OrderProduct[]>>(
		{}
	);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const { id } = useUser();

	useEffect(() => {
		const fetchAllOrders = async () => {
			try {
				const allOrders = await getAllOrders(id);
				console.log(allOrders);
				if (allOrders) setOrders(allOrders);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAllOrders();
	}, [id]);

	useEffect(() => {
		if (orders.length > 0) {
			const fetchAllOrdersProducts = async () => {
				try {
					const productPromises = orders.map(async (order) => {
						const res = await getAllOrdersProducts(order.id);
						console.log(res);
						return { orderId: order.id, products: res || [] };
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

	const handleRowClick = (order: Order) => {
		setSelectedOrder(order);
		onOpen();
	};

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
			<Header />
			<div className="flex flex-col space-y-4 p-8 max-w-4xl mx-auto bg-gray-100 min-h-screen">
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
					onRowAction={(id) => {
						const order = orders.find((order) => order.id === id);
						if (order) handleRowClick(order);
					}}
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn align="center" key={column.key}>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody
						emptyContent={"No rows to display."}
						items={orders}
					>
						{(item) => (
							<TableRow
								key={item.id}
								className="hover:bg-gray-800 transition-colors cursor-pointer"
								onClick={() => handleRowClick(item)}
							>
								{(columnKey) => (
									<TableCell className="text-center">
										{columnKey === "order_date" ? (
											new Date(
												getKeyValue(item, columnKey)
											).toLocaleDateString()
										) : columnKey === "state" ? (
											getKeyValue(item, columnKey) ==
											1 ? (
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

				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					hideCloseButton
					className="my-auto inset-0 z-50 flex items-center justify-center text-3xl"
					classNames={{
						base: "bg-white dark:bg-gray-800 p-0",
						body: "py-4 text-gray-700 dark:text-gray-200",
						footer: "border-t border-gray-300 dark:border-gray-700",
					}}
				>
					<ModalContent className="w-full max-w-2xl max-h-screen overflow-auto rounded-lg">
						{() => (
							<>
								<ModalBody className="p-4">
									{selectedOrder && (
										<div className="space-y-4">
											<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
												<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
													Order Information
												</h3>
												<p>
													<span className="font-medium">
														Order ID:
													</span>{" "}
													{selectedOrder.id}
												</p>
												<p>
													<span className="font-medium">
														Date:
													</span>{" "}
													{new Date(
														selectedOrder.order_date
													).toLocaleDateString()}
												</p>
												<p>
													<span className="font-medium">
														Status:
													</span>
													<span
														className={
															selectedOrder.state ==
															1
																? "text-green-500"
																: "text-yellow-500"
														}
													>
														{selectedOrder.state ==
														1
															? "Delivered"
															: "Pending"}
													</span>
												</p>
											</div>
											<div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow">
												<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
													Products
												</h3>
												<ul className="space-y-2">
													{products[
														selectedOrder.id
													]?.map((product, index) => (
														<li
															key={index}
															className="bg-white dark:bg-gray-600 p-2 rounded shadow"
														>
															<span className="font-medium">
																Product ID:
															</span>{" "}
															{product.product_id}
															,{" "}
															<span className="font-medium">
																Quantity:
															</span>{" "}
															{product.quantity}
														</li>
													))}
												</ul>
											</div>
										</div>
									)}
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
}
