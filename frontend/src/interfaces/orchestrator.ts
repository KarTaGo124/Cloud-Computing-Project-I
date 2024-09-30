export interface CategoryReceipt {
	id: string;
	name: string;
	description: string;
}

export interface ProductReceipt {
	product_id: string;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
	category: CategoryReceipt;
	total: number;
}

export interface OrderReceipt {
	order: {
		id: string;
		order_date: string;
		status: number;
	};
	user: {
		id: number;
		username: string;
		email: string;
		first_name: string | null;
		last_name: string | null;
		phone_number: string | null;
		address: string | null;
		country: string | null;
	};
	products: ProductReceipt[];
	totalPrice: number;
}

export interface FavoriteProduct {
	product_id: string;
	name: string;
	description: string;
	price: number;
	category: CategoryReceipt;
}

export interface UserFavoriteProducts {
	userId: string;
	favoriteProducts: FavoriteProduct[];
}
