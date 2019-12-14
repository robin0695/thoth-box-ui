const defaultState = {
  openPaperList: [{
    paperTitle: 'Welcome',
    fileName: '1805.11752v1.html'
  }],
  activeIndex: 0,
  nextPage: "",
  paperList: []
}
export default (state = defaultState, action) => {

  // Open paper in paper content tabs
  if (action.type === 'openPaperItem') {
    // check if the file already opened.
    let alreadyThere = false

    state.openPaperList.forEach(v => {
      if (v.fileName === action.value.fileName) {
        alreadyThere = true
      }
    })
    if (alreadyThere) return state

    let newState = state
    newState.openPaperList.push(action.value)
    newState.activeIndex = newState.openPaperList.length - 1
    return newState
  }

  if (action.type === 'closePaperItem') {
    let newState = state
    state.openPaperList.forEach((item, index) => {
      if (state.activeIndex === index) {
        if (state.openPaperList.length > 0) {
          if (state.activeIndex - 1 >= 0) {
            newState.activeIndex = state.activeIndex - 1
          } else newState.activeIndex = 0
        } else newState.activeIndex = 0
      }
    })
    newState.openPaperList = state.openPaperList.filter(item => item.fileName !== action.value.fileName)
    if (newState.openPaperList.length === 0) {
      newState.openPaperList = [{
        paperTitle: 'Welcome',
        fileName: '1805.11752v1.html'
      }]
    }
    return newState
  }

  if (action.type === 'loadRecommandPaperList') {
    let newState = state
    newState.nextPage = action.value.nextPage
    action.value.paperList.map((item, index) => newState.paperList.push(item))
    return newState
  }
  return state
}