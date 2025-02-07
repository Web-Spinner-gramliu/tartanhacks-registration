import { deleteCookie } from "cookies-next"
import { NextPage } from "next"
import { ReactElement, useEffect } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import WaveHeader from "src/components/design/WaveHeader"
import styles from "../styles/Auth.module.scss"

const RegisterPage: NextPage = (): ReactElement => {
  useEffect(() => {
    window.localStorage.removeItem("accessToken")
    deleteCookie("accessToken")
  }, [])
  return (
    <div>
      <WaveHeader />
      <div className={styles.scottyContainer}>
        <ScottyLabsIcon className={styles.scottyIcon} />
      </div>
      <div className={styles.dialog}>
        <AuthenticationDialog registration={true} />
      </div>
    </div>
  )
}

export default RegisterPage
