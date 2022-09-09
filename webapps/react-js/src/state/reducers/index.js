import { combineReducers }      from "redux"
import { AuthReducer }          from "./AuthReducer"
import { BidgelySdkReducer }    from "./BidgelySdkReducer"

export const allReducers = combineReducers({
  auth        : AuthReducer,
  bidgelySdk  : BidgelySdkReducer
})