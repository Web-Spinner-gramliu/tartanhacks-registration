import { CircularProgress, Collapse } from "@mui/material"
import { useRouter } from "next/dist/client/router"
import { FunctionComponent, ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

/**
 * Layout to hide content that requires authentication at an admin level.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AdminLayout = (Page: FunctionComponent) => (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    const loginWithToken = async () => {
      setLoading(true)
      try {
        await dispatch(actions.auth.loginWithToken())
      } catch (err) {
        // Login token expired or invalid
        router.push("/login")
      }
      setLoading(false)
    }
    loginWithToken()
  }, [])

  useEffect(() => {
    if (currentUser?._id && !currentUser.admin) {
      router.push("/")
    }
  }, [currentUser])

  if (loading || currentUser == null) {
    return (
      <>
        <WaveBackground />
        <div>
          <ScottyLabsHeader />
          <div className={styles.dialog}>
            <Collapse in={loading}>
              <CircularProgress className={styles.spinner} />
            </Collapse>
          </div>
        </div>
      </>
    )
  }

  return <Page />
}

export default AdminLayout
