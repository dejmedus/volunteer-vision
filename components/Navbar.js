import { Box, Button } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import React from "react";
import Link from "next/link";
import { Stack } from "@mui/system";
import Image from "next/image";

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
        <Link href="/"><Image className={styles.logo} src="/logo.png" alt="logo" height={87} width={195} quality={95} priority/></Link>
        {userProfile != undefined && userProfile.name ? <p>Welcome, {userProfile.name}!</p> : null}{" "}
      </Box>
      <Box className={styles.navigation}>
        <Stack direction="row" spacing={1}>
          <Link href={profileUrl}><Button variant="outlined" color="inherit">Profile</Button></Link>
          <Link href="/project/all"><Button variant="outlined" color="inherit">Projects</Button></Link>
          <Link href="/organization/all"><Button variant="outlined" color="inherit">Organizations</Button></Link>
          <Link href="/api/auth/logout"><Button variant="outlined" color="warning">Log Out</Button></Link>
        </Stack>
      </Box>
    </div>
  );
};