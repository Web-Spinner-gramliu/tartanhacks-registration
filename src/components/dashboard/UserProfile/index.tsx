import { ReactElement } from "react"
import { useSelector } from "react-redux"
import styles from "./index.module.scss"

const UserProfile = (): ReactElement => {
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className={styles.profileCard}>
      <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
      <h1 className={styles.name}>{user.name}</h1>
      <p className={styles.email}>{user.email}</p>
    </div>
  )
}

export default UserProfile
