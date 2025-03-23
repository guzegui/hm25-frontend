import { Buffer } from 'buffer'
import base64 from 'base-64'

const HM25_CONTRACT_INDEX = 12

const makeJsonData = (contractIndex, inputType, inputSize, requestData) => {
    return {
        contractIndex: contractIndex,
        inputType: inputType,
        inputSize: inputSize,
        requestData: requestData,
    }
}

const HEADERS = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
}

async function fetchHM25NumProjects(httpEndpoint) {
    const queryData = makeJsonData(HM25_CONTRACT_INDEX, 3 , 0, '')
    try {
        const response = await fetch(`${httpEndpoint}/v1/querySmartContract`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(queryData),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        if (!json.responseData) {
            throw new Error('No response data received')
        }
        const raw = base64.decode(json.responseData)
        const buf = Buffer.from(raw, 'binary')

        if (buf.length < 8) { // Ensure buffer has at least 16 bytes (2 * 8 bytes)
            console.warn('Buffer too short for stats, returning defaults:', buf.length)
            return {
                numberOfProjects: 0n,
            }
        }

        return {
            numberOfProjects: buf.readBigUInt64LE(0).toString(),
        }
    } catch (error) {
        console.error('Error fetching HM25 stats:', error)
        return {
            numberOfProjects: 0n,
        }
    }
}

let numprojects = await fetchHM25NumProjects('http://185.84.224.100')
console.log(numprojects)
