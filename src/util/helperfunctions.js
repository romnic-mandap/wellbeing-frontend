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