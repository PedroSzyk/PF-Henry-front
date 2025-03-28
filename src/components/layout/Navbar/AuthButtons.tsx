"use client";

import Link from "next/link";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuthButtons() {
  const { userNormal, logoutUser } = useUserContext();
  const { user } = useUser();

  return (
    <>
      {userNormal || user ? (
        <button
          onClick={logoutUser}
          className="flex items-center px-4 py-2 bg-red-600/80 backdrop-blur-sm text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/Login"
            className="flex items-center px-4 py-2 bg-black backdrop-blur-sm text-white rounded-md hover:bg-[#2A1B0A] transition-colors"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Link>
          <Link
            href="/register"
            className="flex items-center px-4 py-2 bg-black backdrop-blur-sm text-white rounded-md hover:bg-[#2A1B0A] transition-colors"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </Link>
        </>
      )}
    </>
  );
}
