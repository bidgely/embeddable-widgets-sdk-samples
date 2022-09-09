import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InitialiseBidgelySdk } from "../../service/bidgely-sdk-service";
import { ACCOUNT_TYPE, FUEL_TYPE, BIDGELY_WIDGETS, BIDGELY_WIDGET_LABELS } from "../../utils/Constants";
import styles from "./Compare.module.css"

function CompareSectionComponent({id}) {

  const [userId, setUserId] = useState("")
  const [fuelType, setFuelType] = useState(FUEL_TYPE.ELECTRIC)
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.RESIDENTIAL)
  const [widget, setWidget] = useState(Object.keys(BIDGELY_WIDGETS)[0])
  const [loading, setIsLoading] = useState(false)
  const [initDone, setInitDone] = useState(false)
  const [instanceId, setInstanceId] = useState(null)
  const [error, setError] = useState(null)
  
  const sdkInitInfo = useSelector(state => state.auth)

  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value)
  }

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value)
  }

  const handleWidgetChange = (event) => {
    setWidget(event.target.value)
  }

  const handleUserIdChange = (event) => {
    setUserId(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) return

    setIsLoading(true)
    setInitDone(false)

    InitialiseBidgelySdk(sdkInitInfo.oauthClient, 
      sdkInitInfo.apiEndPoint,
      sdkInitInfo.accessToken,
      sdkInitInfo.aesKey,
      sdkInitInfo.iv,
      userId,
      null,
      fuelType,
      accountType,
      false).then(resp => {

        setIsLoading(false)
        if (resp.messageType !== "SUCCESS") {
          return
        }

        setInstanceId(resp.data.instanceId)
        setInitDone(true)

        window.BidgelyWebSdk.renderWidget({
          elementId : id,
          instanceId : resp.data.instanceId,
          widgetId : BIDGELY_WIDGETS[widget]
        })

      })
    
      
      
  }

  return (
    <div className={styles.compareSectionMain}>

      <form className={styles.compareUserInfo} onSubmit={handleSubmit}>
        
        <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="Utility User Id" 
          variant="outlined"
          value={userId}
          required
          onChange={handleUserIdChange} />
        
        <FormControl className={styles.compareUserInfoItem}>
          <InputLabel id="fuel-type">Fuel Type</InputLabel>
          <Select
            labelId="fuel-type"
            id="fuel-type-select"
            value={fuelType}
            label={fuelType}
            onChange={handleFuelTypeChange}
          >
            {
              Object.keys(FUEL_TYPE).map(fuelType => {
                return (
                  <MenuItem value={fuelType}>{fuelType}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>

        <FormControl className={styles.compareUserInfoItem}>
          <InputLabel id="account-type">Account Type</InputLabel>
          <Select
            labelId="account-type"
            id="account-type-select"
            value={accountType}
            label={accountType}
            onChange={handleAccountTypeChange}
          >
            {
              Object.keys(ACCOUNT_TYPE).map(accountType => {
                return (
                  <MenuItem value={accountType}>{accountType}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>

        <FormControl className={styles.compareUserInfoItem}>
          <InputLabel id="widget-type">Bidgely Widget</InputLabel>
          <Select
            labelId="widget-type"
            id="widget-type-select"
            value={widget}
            label={widget}
            onChange={handleWidgetChange}
          >
            {
              Object.keys(BIDGELY_WIDGETS).map(widgetKey => {
                return (
                  <MenuItem value={widgetKey}>{BIDGELY_WIDGET_LABELS[widgetKey]}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>

        <Button className={styles.compareUserInfoItem} 
          type="submit" variant="contained" color="primary">
          Select
        </Button>

      </form>
      
      { error && 
        <div>
        </div>
      }

      { loading && <CircularProgress/>}
      
      { <bidgely-usage-insights id={id}></bidgely-usage-insights>
        
      }

    </div>
  )
}

export default CompareSectionComponent