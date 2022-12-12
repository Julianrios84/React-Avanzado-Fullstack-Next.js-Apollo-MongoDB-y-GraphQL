import Head from 'next/head'
import { useRouter } from 'next/router';

import Header from './Header';
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const router = useRouter()

  return (
    <>
      <Head>
        <title>CRM - Administration Clients</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
        {/* <script src="https://cdn.tailwindcss.com"></script> */}
      </Head>

      { ['/log-in', '/sign-in'].includes(router.pathname) ? (
        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
          { children }
        </div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
        <div className='sm:flex min-h-screen'>
          <Sidebar />
          <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
          <Header />
            { children }
          </main>
        </div>
      </div>
      )}
    
    </>
  )
}
