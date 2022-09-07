/* eslint-disable */
import logo from "./logo.svg";

function initialiseSdk() {
  let ivStr = "Bp2B6LRrE4/c+Onj";
  let aesKey = "wW0B6N7paqTe9bk0Xyitu5dhCgVXvPc9";
  let utilityAccountIdentifier = "1243041060";
  let fuelType = "ELECTRIC";
  let accountType = "RESIDENTIAL";
  let accessToken = "d9ae051d-f4ed-4701-a8bf-ba4f7cbb5a7c";
  let client_id = "ameren-dashboard";
  let csr_id = "";
  let renderWidgetsImmediate = true;
  const api_url = "https://amerendevapi.bidgely.com";

  const payload = {
    utilityAccountIdentifier,
    fuelType,
    accountType,
    accessToken,
  };
  try {
    const ivArr = [];
    for (let i in ivStr) {
      ivArr.push(ivStr.charCodeAt(i));
    }

    const iv = new Uint8Array(ivArr),
      privKey = btoa(aesKey);

    const SYM_ALGO = { name: "AES-CBC", length: 256, iv: iv },
      privUint8 = Uint8Array.from(atob(privKey), (c) => c.charCodeAt(0)),
      encStr = new window.TextEncoder("utf-8").encode(JSON.stringify(payload));

    const palette = {
      // primary : {
      //   200 : '#FFEDED',
      //   300 : '#FB8888',
      //   400 : '#F71818',
      //   500 : '#EC0202',
      //   600 : '#BB0606',
      // },
      // primary : {
      //   200 : '#D7FCE4',
      //   300 : '#71F19F',
      //   400 : '#23DC65',
      //   500 : '#14843C',
      //   600 : '#0D5627',
      // }
    };

    crypto.subtle
      .importKey("raw", privUint8, SYM_ALGO, false, ["encrypt", "decrypt"])
      .then((key) => {
        window.crypto.subtle
          .encrypt(SYM_ALGO, key, encStr)
          .then((encPayload) => {
            const encB64 = btoa(
              String.fromCharCode(...new Uint8Array(encPayload))
            );
            const initParams = {
              client_id,
              csr_id,
              api_url,
              payload: encB64,
              palette,
              renderWidgetsImmediate,
            };

            BidgelyWebSdk.initialize(
              BidgelyWebSdk.RUN_MODE.PERF,
              initParams,
              (data) => {
                console.log("BidgelyWebSdk initialize: ", data);

                if (data.messageType === "SUCCESS") {
                  //   instanceId = data.instanceId

                  const localStorageInfo = JSON.parse(
                    localStorage.getItem("bidgelySdkInitInfo") || "{}"
                  );
                  localStorageInfo.clientId = client_id;
                  localStorageInfo.apiUrl = api_url;
                  localStorageInfo.aesKey = aesKey;
                  localStorageInfo.iv = ivStr;
                  localStorageInfo.accessToken = accessToken;
                  localStorageInfo.userId = utilityAccountIdentifier;
                  localStorageInfo.csrId = csr_id;
                  localStorageInfo.accountType = accountType;
                  localStorageInfo.fuelType = fuelType;
                  localStorage.setItem(
                    "bidgelySdkInitInfo",
                    JSON.stringify(localStorageInfo)
                  );

                  //            if (!renderWidgetsImmediate) showRenderContainer()
                }

                if (
                  data.messageType === "SUCCESS" ||
                  data.messageType === "ERROR"
                ) {
                  // const statusBox = document.getElementById('initialise-status')
                  // statusBox.innerHTML = `Initialized : ${JSON.stringify(data)}`
                }
              }
            );
          });
      });
  } catch (e) {
    // const statusBox = document.getElementById('initialise-status')
    // statusBox.innerHTML = `Error : ${e.message}`
  }
}

function App() {
  initialiseSdk();
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <bidgely-home-survey></bidgely-home-survey>
      </header>
    </div>
  );
}

export default App;
