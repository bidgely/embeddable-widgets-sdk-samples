export function setFormDataToLocalStorage(data) {
  const localStorageInfo = JSON.parse(
    localStorage.getItem("bidgelySdkInitInfo") || "{}"
  );
  localStorageInfo.oauthClient = data.oauthClient;
  localStorageInfo.apiEndPoint = data.apiEndPoint;
  localStorageInfo.aesKey = data.aesKey;
  localStorageInfo.iv = data.iv;
  localStorageInfo.accessToken = data.accessToken;
  localStorageInfo.userId = data.userId;
  localStorageInfo.csrId = data.csr_id;
  localStorageInfo.accountType = data.accountType;
  localStorageInfo.fuelType = data.fuelType;
  localStorage.setItem("bidgelySdkInitInfo", JSON.stringify(localStorageInfo));
  //log for info
  console.log("Updated Local Storage With last successful sdk");
}
