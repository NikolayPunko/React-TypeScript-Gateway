
export function ParseDateToFormatYYYY_MM_dd(date: Date){

    return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')

}

// interface Date {
//     format(formatString: string): string;
// }
//
// Date.prototype.format = function (formatString: string): string {
//     return Object.entries({
//         YYYY: this.getFullYear(),
//         YY: this.getFullYear().toString().substring(2),
//         yyyy: this.getFullYear(),
//         yy: this.getFullYear().toString().substring(2),
//         MMMM: this.toLocaleString('default', { month: 'long' }),
//         MMM: this.toLocaleString('default', { month: 'short' }),
//         MM: (this.getMonth() + 1).toString().padStart(2, '0'),
//         M: this.getMonth() + 1,
//         DDDD: this.toLocaleDateString('default', { weekday: 'long' }),
//         DDD: this.toLocaleDateString('default', { weekday: 'short' }),
//         DD: this.getDate().toString().padStart(2, '0'),
//         D: this.getDate(),
//         dddd: this.toLocaleDateString('default', { weekday: 'long' }),
//         ddd: this.toLocaleDateString('default', { weekday: 'short' }),
//         dd: this.getDate().toString().padStart(2, '0'),
//         d: this.getDate(),
//         HH: this.getHours().toString().padStart(2, '0'), // military
//         H: this.getHours().toString(), // military
//         hh: (this.getHours() % 12).toString().padStart(2, '0'),
//         h: (this.getHours() % 12).toString(),
//         mm: this.getMinutes().toString().padStart(2, '0'),
//         m: this.getMinutes(),
//         SS: this.getSeconds().toString().padStart(2, '0'),
//         S: this.getSeconds(),
//         ss: this.getSeconds().toString().padStart(2, '0'),
//         s: this.getSeconds(),
//         TTT: this.getMilliseconds().toString().padStart(3, '0'),
//         ttt: this.getMilliseconds().toString().padStart(3, '0'),
//         AMPM: this.getHours() < 13 ? 'AM' : 'PM',
//         ampm: this.getHours() < 13 ? 'am' : 'pm',
//     }).reduce((acc, entry) => {
//         return acc.replace(entry[0], entry[1].toString())
//     }, formatString)
// }