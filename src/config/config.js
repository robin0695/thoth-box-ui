export const baseAPIUrl =
  process.env.REACT_APP_ENV === 'local'
    ? 'http://localhost:8000'
    : 'http://104.45.130.215:8963'
