import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography
} from "@mui/material"
import { Autocomplete } from "@mui/material"
import { Region, ShirtSize } from "enums/Profile"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import isValidPhoneNumber from "src/util/isValidPhoneNumber"
import { LogisticsFields } from "types/ApplicationForm"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

const LogisticsSection = ({
  validate,
  setValidate,
  setValid,
  isCMUStudent
}: {
  validate: boolean
  setValidate: Dispatch<SetStateAction<boolean>>
  setValid: Dispatch<SetStateAction<boolean>>
  isCMUStudent: boolean
}): ReactElement => {
  const dispatch = useDispatch()

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )

  const logisticsFields =
    useSelector((state: RootState) => state?.application?.logistics) ?? {}

  // Logistics information
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>("")
  const [shirtSize, setShirtSize] = useState<ShirtSize | null>(null)
  const [wantsHardware, setWantsHardware] = useState<boolean>(false)
  const [attendingPhysically, setAttendingPhysically] = useState<boolean>(true)
  const [address, setAddress] = useState<string>("")
  const [region, setRegion] = useState<Region>(Region.URBAN)
  const [phoneNumber, setPhoneNumber] = useState<string>("")

  const [phoneNumberErrorStatus, setPhoneNumberErrorStatus] = useState(false)
  const [phoneNumberHelper, setPhoneNumberHelper] = useState("")

  const validateForm = async () => {
    let valid = true
    if (!isValidPhoneNumber(phoneNumber)) {
      valid = false
      setPhoneNumberErrorStatus(true)
      setPhoneNumberHelper("The phone number format you entered is invalid.")
    } else {
      setPhoneNumberErrorStatus(false)
      setPhoneNumberHelper("")
    }

    if (valid) {
      const data: LogisticsFields = {
        dietaryRestrictions,
        shirtSize: shirtSize as ShirtSize,
        wantsHardware,
        address,
        region: region as Region,
        phoneNumber,
        attendingPhysically
      }
      await dispatch(actions.application.saveLogistics(data))
    }

    setValid(valid)
    setValidate(false)
  }

  useEffect(() => {
    if (validate) {
      validateForm()
    }
    // eslint-disable-next-line
  }, [validate])

  useEffect(() => {
    if (fetchedProfile) {
      setDietaryRestrictions(logisticsFields.dietaryRestrictions ?? "")
      setShirtSize(logisticsFields.shirtSize ?? null)
      setWantsHardware(logisticsFields.wantsHardware ?? false)
      setAddress(logisticsFields.address ?? "")
      setRegion(logisticsFields.region ?? null)
      setPhoneNumber(logisticsFields.phoneNumber ?? "")
      setAttendingPhysically(logisticsFields.attendingPhysically ?? false)
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        LOGISTICS INFORMATION
      </Typography>
      <TextField
        label="Phone Number"
        variant="outlined"
        error={phoneNumberErrorStatus}
        helperText={phoneNumberHelper}
        fullWidth
        required
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value)
        }}
      />
      {/* <TextField
        label="Mailing Address"
        variant="outlined"
        helperText="We use this to send prizes. Swag will not be shipped to remote participants."
        fullWidth
        multiline
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
        }}
      /> */}
      {/* <Autocomplete
        options={Object.values(Region)}
        value={region}
        onChange={(e, value) => setRegion(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Home Region"
            helperText="We use this to measure participation analytics from different regions"
            required
          />
        )}
      /> */}
      <TextField
        label="Dietary Restrictions"
        variant="outlined"
        fullWidth
        value={dietaryRestrictions}
        onChange={(e) => {
          setDietaryRestrictions(e.target.value)
        }}
      />
      <Autocomplete
        options={Object.values(ShirtSize)}
        value={shirtSize}
        onChange={(e, value) => setShirtSize(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Shirt Size"
            required
          />
        )}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={wantsHardware}
              checked={wantsHardware}
              onChange={(e, checked) => setWantsHardware(checked)}
            />
          }
          label="Will you use hardware?"
        />
      </FormGroup>
      {/* In person attendance question only visible to CMU students */}
    </div>
  )
}

export default LogisticsSection
