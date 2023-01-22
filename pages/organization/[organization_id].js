import Head from "next/head";
import styles from "@/styles/Organization.module.css";
import projectStyles from "@/styles/Project.module.css";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { getSupabase } from "../../utils/supabase";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Navbar } from "../../components/Navbar";
import Link from 'next/link';
import { Box } from '@mui/system';
import Image from "next/image";
import { Button } from "@mui/material";

// Individual organization page
export default function Organization_Id({ userProfile }) {
  const router = useRouter()
  const { organization_id } = router.query

  const [org, setOrg] = useState([]);
  const [projects, setProjects] = useState([]);
  const supabase = getSupabase()

  useEffect(() => {
    const fetchOrg = async () => {
      const { data } = await supabase.from('user').select('*').eq('id', organization_id);
      setOrg(data[0]);
      console.log(data[0]);
    }

    const fetchProjects = async () => {
      const { data } = await supabase.from('project').select('*').eq('user_id', organization_id);
      console.log(data)
      setProjects(data)
    }

    fetchOrg()
    fetchProjects()
  }, [])


  return (
    <>
      <Head>
        <title>{org.name}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar userProfile={userProfile} />
      <main className={styles.main}>

        {org != undefined
          ? <>
            <h1>{org.name}{" "}<Link href={encodeURI(org.website)}><LinkSVG /></Link></h1>
            <p>{org.about}</p>
            {projects?.length > 0
              ? <div className={styles.projects}>
                {projects.map(project => {
                  return <ProjectCard key={project.id} description={project.description} urlString={`/project/${project.project_id}`} image_url={project.image_url} name={project.name} location={project.location} />
                })}
              </div>
              : <div className={styles.projectsEmpty}>
                <h3>{`${org.name} will need volunteers soon.`}</h3>
              </div>
            }
          </>
          : null
        }
        <Button className={styles.backButton} variant="contained">
          <Link href="/organization/all">Go Back</Link>
        </Button>

      </main>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { accessToken, sub },
    } = await getSession(req, res)

    const supabase = getSupabase(accessToken)
    let userProfile = null;

    try {
      // if no user has user_id of sub, create new user
      const { data } = await supabase.from('user').upsert({ user_id: sub }, { onConflict: 'user_id' }).select()

      userProfile = data[0];
    }
    catch (e) {
      console.error(e.message)
    }

    return {
      props: { userProfile },
    }
  },
});

function ProjectCard({ urlString, image_url, name, location, description }) {
  return (
    <Link href={urlString}>
      <Box className={projectStyles.all_individual_box}>
        <Image
          width={200}
          height={200}
          src={image_url}
          quality={75}
          alt={`${name} image`}
        />
        <Box className={projectStyles.all_individual_words}>
          <h2>{name}</h2>
          <h4>{location}</h4>
          <p>{description}</p>
        </Box>
      </Box>
    </Link>
  )
}

function LinkSVG() {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="arcs"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>)
}