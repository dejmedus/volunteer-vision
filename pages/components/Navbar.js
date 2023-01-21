import { Box, Button } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import React from "react";
import Link from "next/link";

export const Navbar = ({ userProfile }) => {

  return (
    <div className={styles.navbar}>
      <Link href="/"><Box className={styles.logo}><p>Volunteer Vision</p></Box></Link>
      <Box className={styles.navigation}>
        <Box>Welcome {userProfile != undefined ? userProfile.name : null}!{" "}</Box>
        <Box>
          <Link href="/api/auth/logout"><Button variant="contained">Log Out</Button></Link>
        </Box>
      </Box>
    </div>
  );
};