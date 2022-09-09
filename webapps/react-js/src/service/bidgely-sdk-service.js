/* eslint-disable */

export function InitialiseBidgelySdk(
  client_id,
  api_url,
  accessToken,
  aesKey,
  ivStr,
  utilityAccountIdentifier,
  csr_id,
  fuelType,
  accountType,
  renderWidgetsImmediate,
  palette
) {
  //payload to call the bidgely sdk
  const payload = {
    utilityAccountIdentifier,
    fuelType,
    accountType,
    accessToken,
  };

  //trying to call the bidgely sdk
  return new Promise((resolve, reject) => {
    try {
      const ivArr = [];
      for (let i in ivStr) {
        ivArr.push(ivStr.charCodeAt(i));
      }

      const iv = new Uint8Array(ivArr),
        privKey = btoa(aesKey);

      const SYM_ALGO = { name: "AES-CBC", length: 256, iv: iv },
        privUint8 = Uint8Array.from(atob(privKey), (c) => c.charCodeAt(0)),
        encStr = new window.TextEncoder("utf-8").encode(
          JSON.stringify(payload)
        );

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
                  //instanceId = data.instanceId
                  resolve(data);
                }
              );
            });
        });
    } catch (error) {
      reject(error);
    }
  });
}
