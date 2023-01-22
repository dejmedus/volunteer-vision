import { Box, Button } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import React, { use } from "react";
import Link from "next/link";
import { Stack } from "@mui/system";

export const Navbar = ({ userProfile }) => {

  let profileUrl = "/"
  if (userProfile?.role == 'volunteer') {
    profileUrl = `/volunteer/${userProfile.id}`
  } else {
    profileUrl = `/organization/${userProfile.id}`
  }

  return (
    <div className={styles.navbar}>
      <Box className={styles.logo_box}>
        <Link href="/"><h2 className={styles.logo}>Volunteer Vision</h2></Link>
        {userProfile != undefined && userProfile.name ? <p>Welcome, {userProfile.name}!</p> : null}{" "}
      </Box>
      <Box className={styles.navigation}>
        <Stack direction="row" spacing={1}>
          <Link href={profileUrl}><Button variant="outlined" color="error">Profile</Button></Link>
          <Link href="/project/all"><Button variant="outlined" color="error">Projects</Button></Link>
          <Link href="/organization/all"><Button variant="outlined" color="error">Organizations</Button></Link>
          <Link href="/api/auth/logout"><Button variant="outlined" color="error">Log Out</Button></Link>
        </Stack>
      </Box>
    </div>
  );
};