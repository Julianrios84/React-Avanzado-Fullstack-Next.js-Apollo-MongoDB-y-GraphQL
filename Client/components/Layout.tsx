import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>CRM - Administration Clients</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className='bg-gray-200 min-h-screen'>
        <div className='flex min-h-screen'>
          <Sidebar />
          <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
            { children }
          </main>
        </div>
      </div>
    </>
  )
}
