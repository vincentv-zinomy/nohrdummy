import Head from "next/head";
import AppNav from "../Navbar/AppNav";
import AppFooter from "../Footer/AppFooter";
import NextProgress from 'nextjs-progressbar'


const AppLayout = ({ children }: any) => {
  return (
    <>
      <Head>
        <title>NoHR.ai</title>

        <meta
          name="description"
          content="Schedule Interviews without spending hours  | NoHR.ai"
        />

      </Head>
      <AppNav />
      <NextProgress />
      <main>{children}</main>
      <AppFooter />
    </>
  );
};

export default AppLayout;
