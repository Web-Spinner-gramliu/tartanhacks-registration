import { NextPage } from "next"
import { ReactElement } from "react"
import UserProfile from "src/components/dashboard/UserProfile"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"
import styles from "styles/Profile.module.scss"

const Profile: NextPage = (): ReactElement => (
  <>
    <Menu />
    <div className={styles.container}>
      <UserProfile />
    </div>
  </>
)

export default AuthenticatedLayout(Profile)
