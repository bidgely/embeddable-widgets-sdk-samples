import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { InitialiseBidgelySdk } from "../../service/BidgelySdkService";
import { ACCOUNT_TYPE, FUEL_TYPE, BIDGELY_WIDGETS, BIDGELY_WIDGET_LABELS } from "../../utils/Constants";
import styles from "./Compare.module.css"

function CompareSectionComponent({id}) {

  const containerRef = useRef(null)
  const [oauthClient, setOauthClient] = useState("")
  const [apiEndPoint, setApiEndPoint] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [aesKey, setAesKey] = useState("")
  const [iv, setIv] = useState("")
  const [userId, setUserId] = useState("")
  const [fuelType, setFuelType] = useState(FUEL_TYPE.ELECTRIC)
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.RESIDENTIAL)
  const [widget, setWidget] = useState(Object.keys(BIDGELY_WIDGETS)[6])
  const [loading, setIsLoading] = useState(false)
  const [initDone, setInitDone] = useState(false)
  const [instanceId, setInstanceId] = useState(null)
  const [error, setError] = useState(null)
  
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

  const handleClientChange = (event) => {
    setOauthClient(event.target.value)
  }

  const handleApiEndPointChange = (event) => {
    setApiEndPoint(event.target.value)
  }

  const handleAccessTokenChange = (event) => {
    setAccessToken(event.target.value)
  }

  const handleAesKeyChange = (event) => {
    setAesKey(event.target.value)
  }

  const handleIvChange = (event) => {
    setIv(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userId) return

    setIsLoading(true)
    setInitDone(false)

    InitialiseBidgelySdk(oauthClient, 
      apiEndPoint,
      accessToken,
      aesKey,
      iv,
      userId,
      null,
      fuelType,
      accountType,
      false).then(resp => {

        console.log(`Test`, resp);

        setIsLoading(false)
        setError(null)

        if (resp.messageType !== "SUCCESS") {
          setInitDone(false)
          setError(resp.data)
          return
        }

        setInstanceId(resp.data.instanceId)
        setInitDone(true)
      })

    removeWidget()
  }

  const removeWidget = () => {
    if (!containerRef) return
    const container = containerRef.current
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  const appendWidget = () => {

    const container = containerRef.current
    const widgetId = BIDGELY_WIDGETS[widget]

    const ele = document.createElement('div')
    ele.setAttribute('class', 'widget')
    ele.innerHTML = '<' + widgetId + ` id=${widget}-${id}>` + '</' + widgetId + '>'
    container.appendChild(ele)
  }

  const renderWidget = (e) => {
    e.preventDefault();

    removeWidget()
    appendWidget()

    window.BidgelyWebSdk.renderWidget({
      elementId : `${widget}-${id}`,
      instanceId : instanceId,
      widgetId : BIDGELY_WIDGETS[widget]
    })
  }


  return (
    <div className={styles.compareSectionMain}>

      <form className={styles.compareUserInfo} onSubmit={handleSubmit}>
        
      <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="Client Id" 
          variant="outlined"
          value={oauthClient}
          required
          onChange={handleClientChange} />

        <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="API Endpoint" 
          variant="outlined"
          value={apiEndPoint}
          required
          onChange={handleApiEndPointChange} />

        <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="Access token" 
          variant="outlined"
          value={accessToken}
          required
          onChange={handleAccessTokenChange} />

        <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="AES Key" 
          variant="outlined"
          value={aesKey}
          required
          onChange={handleAesKeyChange} />

        <TextField className={styles.compareUserInfoItem} 
          id="outlined-basic" 
          label="IV" 
          variant="outlined"
          value={iv}
          required
          onChange={handleIvChange} />

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

        <Button className={styles.compareUserInfoItem} 
          type="submit" variant="contained" color="primary">
          Init SDK
        </Button>

      </form>

      { initDone ?
      <form onSubmit={renderWidget}>
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
          Render Widget
        </Button>
        </form> : <></>
      }
      
      { !loading && error && 
        <div> {JSON.stringify(error)} </div>
      }

      { loading && <CircularProgress/> }
      
      { !loading && !error && 
        <div className="widget-container" ref={containerRef}></div>
      }

    </div>
  )
}

export default CompareSectionComponent