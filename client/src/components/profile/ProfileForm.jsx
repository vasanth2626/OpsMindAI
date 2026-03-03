import { useState } from "react";
import {
  updateMyProfile,
  changeMyPassword,
  uploadAvatar,
} from "../../api/profileApi";
import toast from "react-hot-toast";

export default function ProfileForm({ user, onProfileUpdated }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "/default-avatar.png");

  const saveInfo = async () => {
    setInfoLoading(true);
    try {
      const res = await updateMyProfile({ name, email });
      toast.success(res.data.message || "Profile updated");
      onProfileUpdated();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setInfoLoading(false);
    }
  };

  const savePassword = async () => {
    if (!currentPwd || !newPwd) {
      toast.error("Enter current & new password");
      return;
    }
    setPwdLoading(true);
    try {
      const res = await changeMyPassword({
        currentPassword: currentPwd,
        newPassword: newPwd,
      });
      toast.success(res.data.message);
      setCurrentPwd("");
      setNewPwd("");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setPwdLoading(false);
    }
  };

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    setAvatarLoading(true);
    try {
      const res = await uploadAvatar(fd);
      toast.success(res.data.message);
      setAvatarUrl(res.data.avatarUrl || "/default-avatar.png");
      onProfileUpdated();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* Basic info */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Profile</h3>
        <div className="space-y-4 max-w-md">
          <input
            className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
          />
          <input
            className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <button
            onClick={saveInfo}
            disabled={infoLoading}
            className="px-4 py-2 bg-primary rounded text-white text-sm font-medium disabled:opacity-60"
          >
            {infoLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Password</h3>
        <div className="space-y-4 max-w-md">
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            placeholder="Current password"
          />
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-surface border border-borderSubtle text-sm text-white"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="New password"
          />
          <button
            onClick={savePassword}
            disabled={pwdLoading}
            className="px-4 py-2 bg-primary rounded text-white text-sm font-medium disabled:opacity-60"
          >
            {pwdLoading ? "Saving..." : "Change Password"}
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Avatar</h3>
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-borderSubtle object-cover bg-surface"
          />
          <label className="px-3 py-2 bg-surface border border-borderSubtle rounded text-sm text-white cursor-pointer hover:bg-cardHover">
            {avatarLoading ? "Uploading..." : "Change Avatar"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="hidden"
              disabled={avatarLoading}
            />
          </label>
        </div>
      </div>
    </div>
  );
}