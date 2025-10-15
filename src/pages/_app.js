import "@/styles/globals.css";
import "@/styles/App.css";
import 'react-quill/dist/quill.snow.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { Toaster } from "react-hot-toast";
import Layout from '@/components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}
