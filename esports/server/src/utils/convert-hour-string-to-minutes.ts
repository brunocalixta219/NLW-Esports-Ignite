// 18:00 -> ["18", "00"] -> 1080

const convertHourStringToMinutes = (hourString: string) => {
    const [hours, minutes] = hourString.split(':').map(Number)

    const minutesAmount = (hours * 60) + minutes;

    return minutesAmount
}

export default convertHourStringToMinutes;