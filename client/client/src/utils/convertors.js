export const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split('/')
    const date = new Date(`${year}-${month}-${day}T00:00:00`)
    return date
}