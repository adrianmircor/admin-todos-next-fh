'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'
import { IoShieldOutline } from 'react-icons/io5';

export const LogoutButton = () => {

  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    // Primero cerrar sesión para limpiar cookies
    await signOut({ redirect: false });
    // Luego iniciar sesión
    signIn();
  }

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Espere...</span>
      </button>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button
        onClick={handleSignIn}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Ingresar</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group cursor-pointer hover:bg-gray-100 transition">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}