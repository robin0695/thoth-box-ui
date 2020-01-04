const defaultPaper = {
  id: 0,
  paper_id: 'http://arxiv.org/abs/thoth_box_welcome_final',
  paper_title: 'Welcome',
  file_name: 'http://arxiv.org/abs/thoth_box_welcome_final',
  code_url: ''
}
const defaultState = {
  openPaperList: [defaultPaper],
  currentPaper: defaultPaper,
  activeIndex: 0,
  nextPage: '',
  paperList: [],
  paperContentMax: false,
  paperContentSize: 9
}

export default (state = defaultState, action) => {
  // Open paper in paper content tabs
  if (action.type === 'openPaperItem') {
    // check if the file already opened.
    let alreadyThere = false

    state.openPaperList.forEach(v => {
      if (v.id === action.value.id) {
        alreadyThere = true
      }
    })
    if (alreadyThere) return state

    let newState = state
    newState.openPaperList.push(action.value)
    newState.activeIndex = newState.openPaperList.length - 1
    newState.currentPaper = action.value
    return newState
  }

  if (action.type === 'closePaperItem') {
    let newState = state
    state.openPaperList.forEach((item, index) => {
      if (state.activeIndex === index) {
        if (state.openPaperList.length > 0) {
          if (state.activeIndex - 1 >= 0) {
            newState.activeIndex = state.activeIndex - 1
            newState.currentPaper = item
          } else {
            newState.activeIndex = 0
            newState.currentPaper = defaultPaper
          }
        } else {
          newState.activeIndex = 0
          newState.currentPaper = defaultPaper
        }
      }
    })
    newState.openPaperList = state.openPaperList.filter(
      item => item.file_name !== action.value.file_name
    )
    if (newState.openPaperList.length === 0) {
      newState.openPaperList = [defaultPaper]
      newState.currentPaper = defaultPaper
    }
    return newState
  }

  if (action.type === 'loadRecommandPaperList') {
    let newState = state
    newState.nextPage = action.value.nextPage
    action.value.paperList.map((item, index) => newState.paperList.push(item))
    return newState
  }

  if (action.type === 'switchOpenPaper') {
    let newState = state
    newState.currentPaper = action.value
    return newState
  }

  if (action.type === 'likePaper') {
    let newState = state
    newState.paperList.forEach(v => {
      if (v.paper_id === action.value.paper_id) {
        v.like_count = v.like_count + 1
      }
    })
    return newState
  }

  if (action.type === 'paperContentMax') {
    let newState = state
    if (!state.paperContentMax) {
      newState.paperContentMax = true
      newState.paperContentSize = 14
    } else {
      newState.paperContentMax = false
      newState.paperContentSize = 9
    }
    return newState
  }

  return state
}