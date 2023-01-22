import { Box } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Project.module.css";
import Image from "next/image";
import { getSupabase } from "@/utils/supabase";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Profile_Individual = ({ project_id, userProfile, hours, canDelete }) => {
  const router = useRouter();
  const urlString = `/project/${project_id}`;

  const [project, setProject] = useState([]);
  const supabase = getSupabase(userProfile.accessToken);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await supabase
        .from("project")
        .select("*")
        .eq("project_id", project_id);
      console.log(data);
      setProject(data[0]);
    };

    fetchProject();
  }, []);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("applicants")
      .delete()
      .eq("project_id", project_id)
      .eq("user_id", userProfile.id);
    router.push(`/project/all`);
  };

  return (
    <Box className={styles.all_individual_box}>
      <Link href={urlString}>
        <Image
          width={175}
          height={175}
          src={project.image_url}
          quality={75}
          alt="Project Image"
        />
      </Link>
      <Box className={styles.profile_individual_words}>
        <h2>{project.name}</h2>
        <h4>{project.location}</h4>
        <p>Hours: {hours}</p>
        {canDelete == true ? (
          <>
            <Button variant="contained" onClick={() => handleDelete()}>
              Delete
            </Button>
            <p className={styles.profile_individual_delete}>
              Warning: Deletion will remove all hours associated with this event
            </p>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default Profile_Individual;
