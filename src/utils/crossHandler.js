function crossHandler (event,data) {
  window.frames[0].postMessage(JSON.stringify({
    cmd: event,
    data: {
      serchUrl: data,
      isPcPostEvent: true
    }
  }), '*')
}
export default crossHandler;