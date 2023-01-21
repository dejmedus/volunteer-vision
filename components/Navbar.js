import { Box, Button } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import React from "react";
import Link from "next/link";

export const Navbar = ({ userProfile }) => {

  return (
    <div className={styles.navbar}>
      <Box className={styles.logo_box}>
        <Link href="/"><h2 className={styles.logo}>Volunteer Vision</h2></Link>
        {userProfile != undefined ? <p>Welcome, {userProfile.name}</p> : null}!{" "}
      </Box>
      <Box className={styles.navigation}>
        <Box>
          <Link href="/project/all"><Button variant="outlined" color="error">Projects</Button></Link>
          <Link href="/organization/all"><Button variant="outlined" color="error">Organizations</Button></Link>
          <Link href="/api/auth/logout"><Button variant="outlined" color="error">Log Out</Button></Link>
        </Box>
      </Box>
    </div>
  );
};