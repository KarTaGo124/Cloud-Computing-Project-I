import { Edit } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from "../components/Header";

interface UserProfile {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  bio: string;
  date_of_birth: string;
  country: string;
}

const profile: UserProfile = {
  id: 1,
  user_id: 1,
  first_name: "John",
  last_name: "Doe",
  phone_number: "+1234567890",
  address: "123 Main St, Anytown, USA",
  bio: "I love shopping for great products!",
  date_of_birth: "1990-01-01",
  country: "United States"
};

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      // fetchProfile(id).then((data) => {
      //   setProfile(data);
      // });
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-roboto">
      <Header id={id || ''} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-medium">User Profile</h1>
              <button
                onClick={() => navigate('/profile/edit')}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-medium mb-2">Personal Information</h2>
                <p><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</p>
                <p><span className="font-medium">Date of Birth:</span> {profile.date_of_birth}</p>
                <p><span className="font-medium">Country:</span> {profile.country}</p>
              </div>
              <div>
                <h2 className="text-xl font-medium mb-2">Contact Information</h2>
                <p><span className="font-medium">Phone:</span> {profile.phone_number}</p>
                <p><span className="font-medium">Address:</span> {profile.address}</p>
              </div>
              <div className="md:col-span-2">
                <h2 className="text-xl font-medium mb-2">Bio</h2>
                <p className="bg-gray-700 p-4 rounded-md">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}