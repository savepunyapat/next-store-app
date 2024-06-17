export const numberWithCommas = (num: number) => {
    const formattedNumber = num.toLocaleString("en-US", {
      style: "decimal", 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formattedNumber
  }
  
  export const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB")
    return formattedDate
  }
  
  export const formatDateToISOWithoutMilliseconds = (date: any) => {
    return date.toISOString().replace(/\.\d{3}Z$/, '');
  }