import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "http://127.0.0.1:3000/login",  // Explicit redirect URL
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span>Sign out</span>
    </button>
  );
};

export default LogoutButton;
