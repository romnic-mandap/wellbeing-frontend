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

export function format24h(stringTime){
    {/* "13:27:00" -> "1:27 pm" */}
    let parts = stringTime.split(":")

    if(parts[0].substr(0,1) == "0"){
        parts[0] = parts[0].substr(1)
    }

    if(parseInt(parts[0]) >= 0 && parseInt(parts[0]) <= 11){
        return parts[0] + ":" + parts[1] + " am"
    }else{
        let n = parseInt(parts[0]) - 12
        return n.toString() + ":" + parts[1] + " pm"
    }
}