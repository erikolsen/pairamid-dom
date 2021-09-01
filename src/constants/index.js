export const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000' // flask
export const PAIR_FILTER = ps => ps.info !== 'UNPAIRED' && ps.info !== 'OUT_OF_OFFICE'
