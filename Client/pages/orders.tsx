import Layout from '../components/Layout';
import Order from '../components/Order';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client'

const ORDERS_FOR_SELLER_GET = gql`
  query ordersForSellerGet {
    ordersForSellerGet {
        id
        order {
          id
          name
          quantity
        }
        client {
          id
          name
          surnames
          email
          mobile
        }
        vendor
        total
        status
      }
  }
`

export default function Orders() {
  const { data, loading  } = useQuery(ORDERS_FOR_SELLER_GET);
  if (loading) return 'Loading...';
  const { ordersForSellerGet } = data;
  console.log("🚀 ~ file: orders.tsx:34 ~ Orders ~ ordersForSellerGet", ordersForSellerGet)
  return (
    <Layout>
      <h1 className='text-black text-2xl  font-light'>Orders</h1>
      <Link href="/addOrder" className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
        Create Order
      </Link>

      { ordersForSellerGet.length === 0 ? (
            <p className="mt-5 text-center text-2xl">No orders yet</p>
          ) : (
            ordersForSellerGet.map( (order: any) => {
              return (
                <Order 
                  key={order.id}
                  order={order}
                />
              )
            })  
          )}
    </Layout>
  )
}
