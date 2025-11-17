import { cookies } from 'next/headers';
import Link from 'next/link';
import { CiChat1, CiMenuBurger, CiSearch, CiShoppingBasket } from 'react-icons/ci';

const getTotalCount = (cart: { [id: string]: number }): number => {
  let items = 0;
  Object.values(cart).forEach((value) => {
    items += value as number;
  })
  return items;
}

export default async function TopMenu() {

  const cookieStore = await cookies();
  console.log('es TopMenu')
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}');

  const totalItems = getTotalCount(cart);

  return (
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
      <div className="px-6 flex items-center justify-between space-x-4">
        <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
        <button className="w-12 h-16 -mr-2 border-r lg:hidden">
          <CiMenuBurger size={30} />
        </button>
        <div className="flex space-x-2">
          <Link
            href={'/dashboard/cart'}
            className="p-2 flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
            {
              (totalItems > 0) && (
                <span className='text-sm mr-2 text-blue-800 font-bold'>
                  {totalItems}
                </span>
              )
            }
            <CiShoppingBasket size={25} />
          </Link>
        </div>
      </div>
    </div>
  );
}