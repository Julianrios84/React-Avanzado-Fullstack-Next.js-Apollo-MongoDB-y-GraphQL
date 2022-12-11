import Layout from '../components/Layout';
import Product from '../components/Product';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'

const PRODUCTS_GET = gql`
  query productsGet {
    productsGet {
          id
          name
          price
          stock
      }
  }
`;
export default function Products() {

  const { data, loading } = useQuery(PRODUCTS_GET)
  if(loading) return 'Loading...';

  return (
    <Layout>
      <h1 className='text-black text-2xl font-light'>Products</h1>
      <Link href="/addProduct" className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 hover:text-gray-200 mb-3 rounded uppercase font-bold text-sm">
              Add Product
          </Link>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                  <th className="w-1/5 py-2">Name</th>
                  <th className="w-1/5 py-2">Stock</th>
                  <th className="w-1/5 py-2">Price</th>
                  <th className="w-1/5 py-2">Remove</th>
                  <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.productsGet.map( (product: any) => (
                <Product 
                  key={product.id}
                  product={product}
                />
              ))}
            </tbody>
          </table>
    </Layout>
  )
}
