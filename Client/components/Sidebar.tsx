import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black" >CRM Client</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-400 p-1" : "p-1"}>
          <Link className='text-white block' href="/">
          Clients
          </Link>
        </li>
        <li className={router.pathname === "/products" ? "bg-blue-400 p-1" : "p-1"}>
          <Link className='text-white block' href="/products">Products</Link>
        </li>
        <li className={router.pathname === "/orders" ? "bg-blue-400 p-1" : "p-1"}>
          <Link className='text-white block' href="/orders">Orders</Link>
        </li>
      </nav>

      <div className='sm:mt-10'>
        <p className='text-white text-2xl font-black'>Other Options</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === "/bestSellers" ? "bg-blue-400 p-1" : "p-1"}>
          <Link className='text-white block' href="/bestSellers">Best Sellers</Link>
        </li>
        <li className={router.pathname === "/bestCustomers" ? "bg-blue-400 p-1" : "p-1"}>
          <Link className='text-white block' href="/bestCustomers">Best Customers</Link>
        </li>
      </nav>


    </aside>
  )
}
