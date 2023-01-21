import { Box } from '@mui/system'
import Link from 'next/link'
import React from 'react'
import styles from "@/styles/Project.module.css";
import Image from 'next/image';

const All_Individual = ({project_id, name, description, location, image_url}) => {

  const urlString = `/project/${project_id}`

  return (
    <Link href={urlString}>
      <Box className={styles.all_individual_box}>
        <Image
          width={200}
          height={200}
          src={image_url}
          quality={75}
          alt="Project Image"
        />
        <Box className={styles.all_individual_words}>
          <h2>{name}</h2>
          <h4>{location}</h4>
          <p>{description}</p>
        </Box>
      </Box>
    </Link>
  )
}

export default All_Individual