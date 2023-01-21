
import styles from '../styles/Home.module.css'
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { getSupabase } from '../utils/supabase'
import Link from 'next/link'

const Todos = ({ user, todos }) => {
  return (
    <div className={styles.container}>
      <p>
        Welcome {user.name}!{' '}
        </p>
      {console.log(todos)}
      {todos?.length > 0 ? (
        todos.map((todo) => <p key={todo.id}>{todo.content}</p>)
      ) : (
        <p>You have completed all todos!</p>
      )}
        <Link href="/api/auth/logout">
          Logout
        </Link>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const {
      user: { accessToken },
    } = await getSession(req, res)

    const supabase = getSupabase(accessToken)

    const { data: todos } = await supabase.from('todo').select('*')

    return {
      props: { todos },
    }
  },
})

export default Todos