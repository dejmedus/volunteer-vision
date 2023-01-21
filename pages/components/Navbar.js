import { Box, Button } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import React from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "@/utils/supabase";
import Link from "next/link";

export const Navbar = ({ user }) => {
  return (
    <div className={styles.navbar}>
      <Link href="/"><Box className={styles.logo}><p>Volunteer Vision</p></Box></Link>
      <Box className={styles.navigation}>
        <Box>Welcome {user != undefined ? user.name : null}!{" "}</Box>
        <Box>
          <Link href="/api/auth/logout"><Button variant="contained">Log Out</Button></Link>
        </Box>
      </Box>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired();