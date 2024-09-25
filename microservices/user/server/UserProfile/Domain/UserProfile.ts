interface UserProfile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  bio: string;
  date_of_birth: Date;
  country: string;
}

export default UserProfile;
