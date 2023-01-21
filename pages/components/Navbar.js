import Link from 'next/link'

export const Navbar = ({ user }) => {
  return (
    <nav>
      <ul>
        <li>
          {user.name}
        </li>
        <li>
          <Link href="/api/auth/logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}
