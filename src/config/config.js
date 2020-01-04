export const baseAPIUrl =
  process.env.REACT_APP_ENV === 'local' ?
  'http://localhost:8000' :
  'https://thoth-box.com/api/'