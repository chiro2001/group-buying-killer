export function setConfig(data) {
  return dispatch => {
    dispatch({ type: "SET_CONFIG", data: data })
  }
}