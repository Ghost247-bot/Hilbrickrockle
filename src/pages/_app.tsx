import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  // Admin pages use their own layout (AdminLayout component)
  if (isAdminPage) {
    return <Component {...pageProps} />;
  }

  // Regular pages use the main Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 