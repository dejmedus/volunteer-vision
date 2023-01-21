import { Box } from '@mui/system'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from "@/styles/Project.module.css";
import Image from 'next/image';
import { getSupabase } from '@/utils/supabase';

const Profile_Individual = ({ project_id, userProfile }) => {

  const urlString = `/project/${project_id}`

  const [project, setProject] = useState([])
  const supabase = getSupabase(userProfile.accessToken)

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await supabase.from('project').select('*').eq('project_id', project_id)
      console.log(data)
      setProject(data[0])
    }

    fetchProject()
  }, [])

  return (
    <Link href={urlString}>
      <Box className={styles.all_individual_box}>
        <Image
          width={75}
          height={75}
          src={project.image_url}
          quality={75}
          alt="Project Image"
        />
        <Box className={styles.all_individual_words}>
          <h2>{project.name}</h2>
          <h4>{project.location}</h4>
        </Box>
      </Box>
    </Link>
  )
}

export default Profile_Individual 