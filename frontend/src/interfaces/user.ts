export interface User {
	email: string;
	username: string;
	created_at: string;
}

export interface UserProfile {
	id: number;
	first_name: string;
	last_name: string;
	phone_number: string;
	address: string;
	bio: string;
	date_of_birth: string;
	country: string;
}

export interface UserProfileUpdateDto {
	first_name: string;
	last_name: string;
	phone_number: string;
	address: string;
	bio: string;
	date_of_birth: string;
	country: string;
}
