import moment from 'moment';

export function compareByIdDesc(a,b){
    if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
}

export function daysBetweenDates(startDate, endDate){
    {/* yyyy-mm-dd */}
    var sd = moment(startDate)
    var ed = moment(endDate)
    return Math.abs(sd.diff(ed, "days"))
}

export function dateFromDate(startDate, daysApart){
    {/* yyyy-mm-dd, +-N */}
    var sd = moment(startDate)
    if (daysApart > 0){
        return sd.add(daysApart, "days").format('YYYY-MM-DD')
    } else if (daysApart < 0){
        return sd.subtract(daysApart * -1, "days").format('YYYY-MM-DD')
    }
    return startDate;
}

export function dateStringShort(date){
    {/* "yyyy-mm-dd" -> "yy.mm.dd" */}
    let parts = date.split("-")
    parts[0] = parts[0].substring(2)
    return parts.join(".")
}

export function dateTimeConverter(dateObj){
    {/* returns ["yyyy-mm-dd", "hh:mm"] */}
    let h = dateObj.getHours() < 10 ? "0"+dateObj.getHours() : dateObj.getHours() 
    let m = dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes() : dateObj.getMinutes()
    return [dateObj.toISOString().split("T")[0], h+":"+m]
}

export function dayOfWeek(date){
    {/* "yyyy-mm-dd" -> "Monday" */}
    const weekday = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    const d = new Date(date)
    return weekday[d.getDay()]
}

export function dayOfWeekShort(date){
    {/* "yyyy-mm-dd" -> "mon" */}
    const weekday = [
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ]
    const d = new Date(date)
    return weekday[d.getDay()]
}

export function format24h(stringTime){
    {/* "13:27:00" -> "1:27 pm" */}
    let parts = stringTime.split(":")

    if(parts[0].substr(0,1) === "0"){
        parts[0] = parts[0].substr(1)
    }

    if(parseInt(parts[0]) >= 0 && parseInt(parts[0]) <= 11){
        let n = parseInt(parts[0])
        n = (n === 0 ? 12 : n)
        return n.toString() + ":" + parts[1] + " am"
    }else{
        let n = parseInt(parts[0]) - 12
        n = (n === 0 ? 12 : n)
        return n.toString() + ":" + parts[1] + " pm"
    }
}

export function format24hNoSpace(stringTime){
    {/* "13:27:00" -> "1:27pm" */}
    let parts = stringTime.split(":")

    if(parts[0].substr(0,1) === "0"){
        parts[0] = parts[0].substr(1)
    }

    if(parseInt(parts[0]) >= 0 && parseInt(parts[0]) <= 11){
        let n = parseInt(parts[0])
        n = (n === 0 ? 12 : n)
        return n.toString() + ":" + parts[1] + "am"
    }else{
        let n = parseInt(parts[0]) - 12
        n = (n === 0 ? 12 : n)
        return n.toString() + ":" + parts[1] + "pm"
    }
}

export function format24hHour(stringTime){
    {/* "13:27:00" -> "1pm" */}
    let parts = stringTime.split(":")

    if(parts[0].substr(0,1) === "0"){
        parts[0] = parts[0].substr(1)
    }

    if(parseInt(parts[0]) >= 0 && parseInt(parts[0]) <= 11){
        let n = parseInt(parts[0])
        n = (n === 0 ? 12 : n)
        return n.toString() + "am"
    }else{
        let n = parseInt(parts[0]) - 12
        n = (n === 0 ? 12 : n)
        return n.toString() + "pm"
    }
}