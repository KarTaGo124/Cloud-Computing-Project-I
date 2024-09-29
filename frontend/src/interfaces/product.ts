export interface Category {
	id: string;
	name: string;
	description: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: Category;
	imageUrl: string;
}
