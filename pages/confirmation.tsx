import { NextPage } from "next"
import React, { ReactElement, useEffect, useState } from "react"
import { AuthenticatedLayout, DialogLayout } from "src/layouts"
import ConfirmationDialog from "src/components/confirmation/ConfirmationDialog"
import Menu from "src/components/menu/Menu"
import WaveBackground from "src/components/design/WaveBackground"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import styles from "../styles/Confirmation.module.scss"
import { useRouter } from "next/router"
import { Status } from "enums/Status"
import { useSelector } from "react-redux"
import { RootState } from "types/RootState"

const ConfirmationPage: NextPage = (): ReactElement => {
  const status =
    useSelector((state: RootState) => state?.accounts?.data?.status) ??
    Status.UNVERIFIED
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  useEffect(() => {
    if (status !== Status.ADMITTED) {
      router.push("/")
    } else {
      setIsAuthorized(true)
    }
  }, [])

  if (!isAuthorized) {
    return <></>
  }

  return (
    <>
      <WaveBackground />
      <Menu />
      <div className={styles.dialog}>
        <ScottyLabsHeader />
        <ConfirmationDialog />
      </div>
    </>
  )
}

export default AuthenticatedLayout(ConfirmationPage)
