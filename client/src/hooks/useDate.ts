import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()

export const useDate = () => {

  const dateFormat = (date : Date) => {
    return dayjs(date).local().format("DD/MM/YYYY");
  } 

  return {
    dateFormat
  }

}