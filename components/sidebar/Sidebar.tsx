import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogoutButton } from "./LogoutButton";

const menuItem = [
  {
    icon: <IoCalendarOutline />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline />,
    title: 'Productos',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonOutline />,
    title: 'Perfil',
    path: '/dashboard/profile'
  },
]

export default async function Sidebar() {

  /* Los siguientes campos son seteados por NextAuth
  gracias a que se mapean con PrismaAdapter
    - user?.name: profile.name,
    - user?.image: profile.picture
  */
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? 'No name';
  const avatarUrl = (session?.user?.image) ? session?.user?.image : 'https://img.freepik.com/premium-vector/grayscale-angry-face-icon_604285-6.jpg';
  const userRoles = session?.user?.roles ?? ['client']
  const formatUserRoles = userRoles.length === 1
    ? userRoles[0]
    : userRoles.join(',');


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="mt-8 text-center">
          <Image
            src={avatarUrl}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150} />
          <h5 className="hidden mt-2 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block">{formatUserRoles}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItem.map(item => (
              <SidebarItem key={item.path} {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}