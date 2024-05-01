import axios from 'axios'

const version = 'v1'
// const API_URL = `https://api.bitpin.org/${version}/`;
const API_URL = `https://reqres.in/api`

axios.defaults.baseURL = API_URL
axios.defaults.timeout = 6000
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const login = async (user: any): Promise<any> => {
    try {
        const { data, status } = await axios.get('/mkt/markets/')
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message)
            return error.message
        } else {
            console.log('unexpected error: ', error)
            return 'An unexpected error occurred'
        }
    }
}

export const getMarkets = async (): Promise<any> => {
    try {
        const { data, status } = await axios.get('/mkt/markets/')
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message)
            return error.message
        } else {
            console.log('unexpected error: ', error)
            return 'An unexpected error occurred'
        }
    }
}
