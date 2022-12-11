import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import client from '../config/apollo';
import OrderState from '../context/orders/orderState'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ApolloProvider client={client}>
        <OrderState>
            <Component {...pageProps} />
        </OrderState>
    </ApolloProvider>
)
}
