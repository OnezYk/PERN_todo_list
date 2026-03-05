import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday"
import weekday from "dayjs/plugin/weekday"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.guess()
dayjs.extend(weekday)
dayjs.extend(isToday)

export const dateFormat = {

  isToday: (date : Date) => {
    return dayjs(date).isToday()
  },

  getWeekDate: (date:Date) => {

    if (dayjs(date).isToday()) {
      return "Hoje"
    }

    const hoje = dayjs().format("YYYY-MM-DD")
    const hojeDaSemana = dayjs().weekday()
    const diaDaSemana = dayjs(date).weekday()
    const data = dayjs(date).format("YYYY-MM-DD")
    const diff = dayjs(data).diff(hoje) / 1000 / 60 / 60 / 24
    
    console.log(hojeDaSemana + diff)

    if(hojeDaSemana + diff - 1 <= 6) {

      switch (hojeDaSemana + diff - 1) {
        case 0: 
        return "Segunda"
        case 1: 
        return "Terça"
        case 2: 
        return "Quarta"
        case 3: 
        return "Quinta"
        case 4: 
        return "Sexta"
        case 5: 
        return "Sábado"
        case 6: 
        return "Domingo"
      }} else {
        return dayjs(date).local().format("DD/MM/YYYY");
       }

  }


}
