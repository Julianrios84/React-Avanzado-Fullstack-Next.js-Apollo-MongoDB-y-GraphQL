import { useState } from 'react';
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from "../components/Layout";

const USER_AUTH = gql`
    mutation userAuth($input: AuthInput) {
      userAuth(input: $input) {
            token
        }
    }
`;


export default function LogIn() {

  const router = useRouter();
  const [message, saveMessage] = useState('');
  const [userAuth] = useMutation(USER_AUTH);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required('Email cannot be empty'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async values => {
      const { email, password } = values;

      try {
        const { data } = await userAuth({
          variables: {
            input: {
              email,
              password
            }
          }
        });
        saveMessage('Authenticating...');
        setTimeout(() => {
          const { token } = data.userAuth;
          localStorage.setItem('token', token);
        }, 1500);

        setTimeout(() => {
          saveMessage('');
          router.push('/');
        }, 1500);

      } catch (error: any) {
        saveMessage(error.message.replace('GraphQL error: ', ''));
        setTimeout(() => {
          saveMessage('');
        }, 1500);
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
      <h1 className='text-center text-white text-2xl font-black'>Login</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input type="text" className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2" >
              <p className="font-bold">Error: {formik.errors.email}</p>
            </div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password} />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2" >
              <p className="font-bold">Error: {formik.errors.password}</p>
            </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
              value="Log In"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}
