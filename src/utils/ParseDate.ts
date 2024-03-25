export default class ParseDate {
    static ParseDateToFormatYYYY_MM_dd(date: Date){
        return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
    }

    static ParseDateToFormatYYYY_MM_dd_HH_mm_ss(date: Date){
        return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
            +" "+ date.getHours().toString().padStart(2, '0') +":"+ date.getMinutes().toString().padStart(2, '0') +":"+ date.getSeconds().toString().padStart(2, '0')
    }

    static ParseStringDateToFormatYYYY_MM_dd_HH_mm_ss(str: string){
        return ParseDate.ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(str))
    }

    static ParseDateToFormatYYYYMMddTHHmmsstttZ(date: Date){
        return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
            +"T"+ date.getHours().toString().padStart(2, '0') +":"+ date.getMinutes().toString().padStart(2, '0') +":"+ date.getSeconds().toString().padStart(2, '0')
            +"."+ date.getMilliseconds().toString().padStart(3, '0') +"Z"

    }

    static ParseStringDateToFormatYYYYMMddTHHmmsstttZ(str: string){
        return ParseDate.ParseDateToFormatYYYYMMddTHHmmsstttZ(new Date(str))
    }

    static parseXMLToDateToFormatYYYY_MM_dd(str: string){
        let result = str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6,8);
        return result
    }

    static separateTwoDatesAndParse(str: string){
        let result = str.split("-")
        result[0] = ParseDate.parseXMLToDateToFormatYYYY_MM_dd(result[0])
        result[1] = ParseDate.parseXMLToDateToFormatYYYY_MM_dd(result[1])
        return result;
    }

    static setEndOfDay(date: Date){
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        date.setMilliseconds(999)
        return date;
    }

    static setStartOfDay(date: Date){
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date;
    }
}
// export function ParseDateToFormatYYYY_MM_dd(date: Date){
//     return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
// }
//
// export function ParseDateToFormatYYYY_MM_dd_HH_mm_ss(date: Date){
//     return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
//         +" "+ date.getHours().toString().padStart(2, '0') +":"+ date.getMinutes().toString().padStart(2, '0') +":"+ date.getSeconds().toString().padStart(2, '0')
// }
//
// export function ParseStringDateToFormatYYYY_MM_dd_HH_mm_ss(str: string){
//     return ParseDateToFormatYYYY_MM_dd_HH_mm_ss(new Date(str))
// }
//
// export function ParseDateToFormatYYYYMMddTHHmmsstttZ(date: Date){
//     return  date.getFullYear() +"-"+ (date.getMonth() + 1).toString().padStart(2, '0') +"-"+ date.getDate().toString().padStart(2, '0')
//         +"T"+ date.getHours().toString().padStart(2, '0') +":"+ date.getMinutes().toString().padStart(2, '0') +":"+ date.getSeconds().toString().padStart(2, '0')
//         +"."+ date.getMilliseconds().toString().padStart(3, '0') +"Z"
//
// }
// export function ParseStringDateToFormatYYYYMMddTHHmmsstttZ(str: string){
//     return ParseDateToFormatYYYYMMddTHHmmsstttZ(new Date(str))
// }
//
// export function parseXMLToDateToFormatYYYY_MM_dd(str: string){
//     let result = str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6,8);
//     return result
// }
//
// export function setEndOfDay(date: Date){
//     date.setHours(23)
//     date.setMinutes(59)
//     date.setSeconds(59)
//     date.setMilliseconds(999)
//     return date;
// }
//
// export function setStartOfDay(date: Date){
//     date.setHours(0)
//     date.setMinutes(0)
//     date.setSeconds(0)
//     date.setMilliseconds(0)
//     return date;
// }

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