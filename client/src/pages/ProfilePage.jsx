import { useEffect, useState } from "react";
import { getMyProfile } from "../api/profileApi";
import ProfileForm from "../components/profile/ProfileForm";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      setUser(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">My Profile</h1>
        <p className="text-sm text-muted mt-1">
          View or update your account details.
        </p>
      </div>

      {/* ✅ Avatar at top */}
      {user && (
        <div className="flex justify-center mb-6">
          <img
            src={user.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full border border-borderSubtle object-cover bg-surface"
          />
        </div>
      )}

      {user && (
        <ProfileForm user={user} onProfileUpdated={fetchProfile} />
      )}
    </div>
  );
}