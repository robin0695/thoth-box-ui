const defaultState = {
  openPaperList: [{
      paperTitle: 'robin test1',
      fileName: '1805.11752v1.html'
    },
    {
      paperTitle: 'loooooooooooooo',
      fileName: '1805.11752v2.html'
    },
    {
      paperTitle: 'sldkfjlskdj',
      fileName: '1805.11752v3.html'
    }
  ],
  activeIndex: 1
}

export default (state = defaultState, action) => {
  if (action.type === 'openPaperItem') {
    // check if the file already opened.
    let alreadyThere = false

    state.openPaperList.forEach(v => {
      if (v.fileName === action.value.fileName) {
        alreadyThere = true
      }
    })
    if (alreadyThere) return state

    let newState = state.openPaperList.concat(action.value)
    return {
      'openPaperList': newState,
      'activeIndex': newState.length - 1
    }
  }

  if (action.type === 'closePaperItem') {
    state.openPaperList.forEach((item, index) => {
      if (state.activeIndex === index) {
        console.log(index)
        console.log(state.activeIndex)
      }
    })
    let newState = state.openPaperList.filter(item => item.fileName !== action.value.fileName)
    return {
      'openPaperList': newState
    }
  }
  return state
}