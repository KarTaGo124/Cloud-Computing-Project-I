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
import Modal from "react-modal";
import { Button } from "@nextui-org/react";
import { useUser } from "../contexts/UserContext";
import { Header } from "../components/Header";
import { Order } from "../interfaces/order";
import { getAllOrders, deleteOrder } from "../services/order";
import { OrderReceipt } from "../interfaces/orchestrator";
import { getOrderReceipt } from "../services/orchestrator";

Modal.setAppElement("#root");

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
		key: "status",
		label: "Status",
	},
];

export default function OrderHistory() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [orderReceipt, setOrderReceipt] = useState<OrderReceipt | null>(null); // Guardar el recibo de la orden
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const { id } = useUser();

	useEffect(() => {
		const fetchAllOrders = async () => {
			try {
				const allOrders = await getAllOrders(id);
				if (allOrders) setOrders(allOrders);
			} catch (error) {
				console.log(error);
			}
		};
		fetchAllOrders();
	}, [id]);

	const handleRowClick = async (order: Order) => {
		setSelectedOrder(order);
		try {
			// Llamamos a getOrderReceipt para obtener la información completa de la orden
			const receipt = await getOrderReceipt(order.id);
			setOrderReceipt(receipt); // Guardamos el recibo en el estado
			setModalIsOpen(true);
		} catch (error) {
			console.log("Error fetching order receipt:", error);
		}
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const handleDelete = async () => {
		if (selectedOrder) {
			try {
				await deleteOrder(selectedOrder.id);
				setOrders(
					orders.filter((order) => order.id !== selectedOrder.id)
				);
				closeModal();
			} catch (error) {
				console.log("Error deleting order", error);
			}
		}
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
										) : columnKey === "status" ? (
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
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={{
						overlay: {
							backgroundColor: "rgba(0, 0, 0, 0.75)",
						},
						content: {
							top: "50%",
							left: "50%",
							right: "auto",
							bottom: "auto",
							marginRight: "-50%",
							transform: "translate(-50%, -50%)",
							width: "50%",
							borderRadius: "8px",
							padding: "20px",
							backgroundColor: "#1f2937",
							color: "#e5e7eb", // Texto blanco
						},
					}}
				>
					{orderReceipt && (
						<div className="space-y-4">
							<div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow">
								<h3 className="text-lg font-semibold mb-2 text-gray-100">
									Order Information
								</h3>
								<p>
									<span className="font-medium">
										Order ID:
									</span>{" "}
									{orderReceipt.order.id}
								</p>
								<p>
									<span className="font-medium">Date:</span>{" "}
									{new Date(
										orderReceipt.order.order_date
									).toLocaleDateString()}
								</p>
								<p>
									<span className="font-medium">Status:</span>{" "}
									<span
										className={
											orderReceipt.order.status == 1
												? "text-green-500"
												: "text-yellow-500"
										}
									>
										{orderReceipt.order.status == 1
											? "Delivered"
											: "Pending"}
									</span>
								</p>
								{orderReceipt.order.status == 0 && (
									<Button
										className="bg-red-500 text-white hover:bg-red-700"
										onPress={handleDelete}
									>
										Delete Order
									</Button>
								)}
							</div>

							<div className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg shadow">
								<h3 className="text-lg font-semibold mb-2 text-gray-100">
									Products
								</h3>
								<ul className="space-y-2">
									{orderReceipt.products.map(
										(product, index) => (
											<li
												key={index}
												className="bg-white dark:bg-gray-600 p-2 rounded shadow flex items-center"
											>
												<img
													src={product.imageUrl}
													alt={product.name}
													className="w-16 h-16 object-cover rounded-md mr-4"
												/>
												<div>
													<p className="text-gray-900 dark:text-gray-100">
														<strong>Name:</strong>{" "}
														{product.name}
													</p>
													<p className="text-gray-900 dark:text-gray-100">
														<strong>
															Quantity:
														</strong>{" "}
														{product.quantity}
													</p>
													<p className="text-gray-900 dark:text-gray-100">
														<strong>Price:</strong>{" "}
														{product.price.toFixed(
															2
														)}
													</p>
													<p className="text-gray-900 dark:text-gray-100">
														<strong>Total:</strong>{" "}
														{product.total.toFixed(
															2
														)}
													</p>
												</div>
											</li>
										)
									)}
								</ul>
								<p className="text-lg font-semibold text-gray-100 mt-4">
									Total Price:{" "}
									{orderReceipt.totalPrice.toFixed(2)}
								</p>
							</div>

							<Button
								onPress={closeModal}
								className="bg-blue-500 text-white hover:bg-blue-700"
							>
								Close
							</Button>
						</div>
					)}
				</Modal>
			</div>
		</div>
	);
}
