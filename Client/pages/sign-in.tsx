import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import { useRouter } from "next/router";

const CREATE_ACCOUNT = gql`
  mutation userCreate($input: UserInput) {
    userCreate(input: $input) {
      id
      name
      surnames
      email
    }
  }
`;

export default function SignIn() {

  const [message, saveMessage] = useState('')
  const [userCreate] = useMutation(CREATE_ACCOUNT);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      surnames: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required.'),
      surnames: Yup.string()
        .required('Surnames is required.'),
      email: Yup.string()
        .email('Email not valid.')
        .required('Email is required.'),
      password: Yup.string()
        .required('Password cannot be empty.')
        .min(6, 'Password must be at least 6 characters')
    }),
    onSubmit: async values => {
      const { name, surnames, email, password } = values
      try {
        const { data } = await userCreate({
          variables: {
            input: {
              name,
              surnames,
              email,
              password
            }
          }
        });
        saveMessage(`The User was created correctly: ${data.userCreate.name} `);
        setTimeout(() => {
          saveMessage('');
          router.push('/log-in')
        }, 1500);
      } catch (error: any) {
        saveMessage(error.message.replace('GraphQL error: ', ''));
        setTimeout(() => {
          saveMessage('');
        }, 1500);
      }
    }
  });

  const showMessage = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <Layout>
      {message && showMessage()}

      <h1 className='text-center text-white text-2xl font-black'>Sign In</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input type="text" className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" placeholder="Enter name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2" >
                <p className="font-bold">Error: {formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surnames">Surnames</label>
              <input type="text" className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="surnames" placeholder="Enter surnames"
                value={formik.values.surnames}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.surnames && formik.errors.surnames ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2" >
                <p className="font-bold">Error: {formik.errors.surnames}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input type="email" className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange} />
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
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2" >
                <p className="font-bold">Error: {formik.errors.password}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900"
              value="Sign In"
            />
          </form>
        </div>
      </div>
    </Layout>
  )
}