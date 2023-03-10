import Head from 'next/head';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layout from '@/components/Layout';

const SiteLayoutWrapper = ({ children }: { children: React.ReactNode; }) => {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <>
      <Head>
        <title>{`THUNDERWHEEL`}</title>
        <meta name="description" content="Two movies enter one movie leaves" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <Layout>
        {children}
      </Layout>
      {/* <Footer /> */}
    </>
  );
};

export default SiteLayoutWrapper;