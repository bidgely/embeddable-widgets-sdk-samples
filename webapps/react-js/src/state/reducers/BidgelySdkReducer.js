export const BIDGELY_SDK_ACTIONS = {
  SET_SDK_INSTANCE : 'SET_SDK_INSTANCE'
}

export const setSdkInstance = (instanceId, userId, fuelType, accountType) => {
  return dispatch => {
    dispatch({ 
      type: BIDGELY_SDK_ACTIONS.SET_SDK_INSTANCE, 
      payload : {
        instanceId, userId, fuelType, accountType
      }
    })
  }
}

export const BidgelySdkReducer = (state = { instances : [] }, action) => {
  
  switch (action.type) {
    case BIDGELY_SDK_ACTIONS.SET_SDK_INSTANCE:
      const payload = action.payload
      const instances = state.instances
      instances.push(payload)
      return {
        ...state,
        instances
      }

    default:
      return state

  }

}