import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getSupabase } from "../../utils/supabase";
import Link from "next/link";
import { Navbar } from "../components/navbar";

// All projects
export default function all({ user }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1>All Projects</h1>
          Welcome {user.name}!{' '}
          <Link href="/api/auth/logout">
            Logout
          </Link>
      </main>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();