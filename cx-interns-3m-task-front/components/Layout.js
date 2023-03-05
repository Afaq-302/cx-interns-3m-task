import Head from 'next/head';
import Nav from './Nav';

const Layout = ({ user, loading = false, children, userSession }) => {
  // console.log("Layout", userSession);

  return (
    <>
      <Nav userSession={userSession} />
      <Head>
        <title>Articles Website By Afaq</title>
      </Head>
      <main>
        <div>{children}</div>
      </main>
    </>
  )

}
export default Layout;
