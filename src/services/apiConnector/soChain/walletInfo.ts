import config from 'config'
import axios from 'axios'

const BASE_URL = config.get('SOCHAIN.BASE_URL')

type balanceObject = {
    status: number,
    message: string,
    result: string
}

export const getBalanceForAddress = async (address: string, coin: string): Promise<balanceObject> => {
    const query = `${BASE_URL}${address}`
    try {
        const result = await axios.get(query)
        console.log(result)
        
        // result.data.result = formatEtherResponse(result.data.result)
        return result.data
    } catch (err) {
        console.log(err)
        return {
            status: 0,
            message: err.message,
            result: 'error'
        }
    }
}