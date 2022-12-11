import Layout from '../components/Layout'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link'
import Client from '../components/Client';

const CLIENTS_FOR_SELLER_GET = gql`
    query clientsForSellerGet {
      clientsForSellerGet {
            id
            name
            surnames
            company
            email
        }
    }
`;

export default function Home() {

  const router = useRouter();
  const { data, loading } = useQuery(CLIENTS_FOR_SELLER_GET);

  if (loading) return 'Loading....';
  if (!data.clientsForSellerGet) return router.push('/login');

  return (
    <Layout>
      <h1 className='text-black text-2xl text-gray-800 font-light'>Clients</h1>

      <Link href="/addClient" className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
        Add Client
      </Link>

      <div className="overflow-x-scroll">
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Remove</th>
              <th className="w-1/5 py-2">Edit</th>
            </tr>
          </thead>

          <tbody className="bg-white text-black">
            {data.clientsForSellerGet.map((client: any) => (
              <Client
                key={client.id}
                client={client}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
