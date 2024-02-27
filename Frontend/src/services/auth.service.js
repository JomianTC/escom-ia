const baseUrl = 'https://api.disneyapi.dev/character/'

export const getCharachter = async (id) => {
    const url = `${baseUrl}${id}`
    const response = await fetch(url)
    const {data} = await response.json()
    console.log(data);
    return data
}