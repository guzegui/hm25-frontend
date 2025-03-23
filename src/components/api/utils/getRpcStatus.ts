const baseURL = process.env.REACT_APP_BASE_URL

// Querying the RPC status
export async function getRPCStatus() {
    const res = await fetch(`${baseURL}/v1/tick-info`)
    const data = await res.json()

    console.log(JSON.stringify(data, null, 2))

    return data
}

await getRPCStatus()