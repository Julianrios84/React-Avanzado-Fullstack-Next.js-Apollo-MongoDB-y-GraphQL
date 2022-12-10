import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black" >CRM Client</p>
      </div>
      <nav className="mt-5 list-none">
        <li>
          <Link className='text-white mb-2 block' href="/">
          Clients
          </Link>
        </li>
        <li>
          <Link className='text-white mb-2 block' href="/products">Products</Link>
        </li>
        <li>
          <Link className='text-white mb-2 block' href="/orders">Orders</Link>
        </li>
      </nav>
    </aside>
  )
}
