// File: client/src/components/profile/AvatarUploader.jsx (new)


import { useState } from "react";
import { uploadAvatar } from "../../api/profileApi";
import toast from "react-hot-toast";

export default function AvatarUploader({ avatarUrl, onUploaded }) {
  const [loading, setLoading] = useState(false);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    setLoading(true);
    try {
      await uploadAvatar(fd);
      toast.success("Avatar uploaded");
      onUploaded && onUploaded();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt="avatar"
        className="w-16 h-16 rounded-full border border-borderSubtle object-cover bg-surface"
      />
      <label className="px-3 py-2 bg-surface border border-borderSubtle rounded text-sm text-white cursor-pointer hover:bg-cardHover">
        {loading ? "Uploading..." : "Change Avatar"}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatar}
          className="hidden"
          disabled={loading}
        />
      </label>
    </div>
  );
}