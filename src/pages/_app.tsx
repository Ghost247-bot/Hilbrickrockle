import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';

type NextPageWithLayout = AppProps['Component'] & {
  getLayout?: (page: ReactElement) => ReactElement;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  // Use getLayout if available (for admin pages)
  const getLayout = (Component as NextPageWithLayout).getLayout || ((page: ReactElement) => page);

  // Admin pages use their own layout via getLayout
  if (isAdminPage) {
    return getLayout(<Component {...pageProps} />);
  }

  // Regular pages use the main Layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 