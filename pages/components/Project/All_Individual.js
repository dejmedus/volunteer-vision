import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import styles from "@/styles/Project.module.css";

const All_Individual = ({project_id, name, description}) => {

  const urlString = `/project/${project_id}`

  return (
    <Link href={urlString}>
      <Box className={styles.all_individual_box}>
        <h3>{name}</h3>
        <p>{description}</p>
      </Box>
    </Link>
  )
}

export default All_Individual