import { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router'

const CLIENT_CREATE = gql`
    mutation clientCreate($input: ClientInput) {
      clientCreate(input: $input) {
            id
            name
            surnames
            company
            email
            mobile
        }
    }
`;

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
export default function AddClient() {

  const router = useRouter();
  const [message, saveMessage] = useState('');
  const [clientCreate] = useMutation(CLIENT_CREATE, {
    update(cache, { data: { clientCreate } }) {
      const { clientsForSellerGet }: any = cache.readQuery({ query: CLIENTS_FOR_SELLER_GET });
      cache.writeQuery({
        query: CLIENTS_FOR_SELLER_GET,
        data: {
          clientsForSellerGet: [...clientsForSellerGet, clientCreate]
        }
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      surnames: '',
      company: '',
      email: '',
      mobile: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Customer name is required'),
      surnames: Yup.string()
        .required('Last name of the client is required'),
      company: Yup.string()
        .required('Company field is required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Customer email is required')
    }),
    onSubmit: async values => {

      const { name, surnames, company, email, mobile } = values

      try {
        const { data } = await clientCreate({
          variables: {
            input: {
              name, 
              surnames, 
              company, 
              email, 
              mobile
            }
          }
        });
        console.log("🚀 ~ file: addClient.tsx:83 ~ AddClient ~ data", data)
        router.push('/');
      } catch (error: any) {
        console.log("🚀 ~ file: addClient.tsx:85 ~ AddClient ~ error", error)
        saveMessage(error.message.replace('GraphQL error: ', ''));

        setTimeout(() => {
          saveMessage('');
        }, 2000);
      }
    }
  })

  const showMessage = () => {
    return (
      <div className="text-black bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      <h1 className='text-black text-2xl text-gray-800 font-light'>Add Client</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>

              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Enter name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>

            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 py-3 px-2" >
                <p className="font-bold">Error: {formik.errors.name}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surnames">
                Surnames
              </label>

              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="surnames"
                type="text"
                placeholder="Enter surnames"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surnames}
              />
            </div>

            {formik.touched.surnames && formik.errors.surnames ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700  py-3 px-2" >
                <p className="font-bold">Error: {formik.errors.surnames}</p>
              </div>
            ) : null}


            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                Company
              </label>

              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                placeholder="Enter company"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
              />
            </div>

            {formik.touched.company && formik.errors.company ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700  py-3 px-2" >
                <p className="font-bold">Error: {formik.errors.company}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>

              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 py-3 px-2" >
                <p className="font-bold">Error: {formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                Mobile
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobile"
                type="tel"
                placeholder="Enter mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
            </div>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Create"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}
