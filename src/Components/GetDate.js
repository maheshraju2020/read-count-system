//Will return Today's date in this format, September 14,2020 06:00

export default function getTodaysDate() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const date = new Date();
    const mon = months[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    if (hour.length < 2) {
        hour = "0" + hour;
    }
    if (min.length < 2) {
        min = "0" + min;
    }
    const curDate = mon + " " + day + "," + year + " " + hour + ":" + min;
    return curDate;
}
