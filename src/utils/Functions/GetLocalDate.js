export const GetLocalDate = () => {
  const date = new Date();
  let day = date.getDate()
  let month = date.getMonth()

  if (day < 10) {
    day = `0${day + 1}`
  }

  if (month < 10) {
    month = `0${month + 1}`
  }

  let year = date.getFullYear()

  return `${year}-${month}-${day}`
}