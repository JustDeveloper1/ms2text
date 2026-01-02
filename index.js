/*

MIT License

Copyright (c) 2025 JustDeveloper <https://justdeveloper.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/*

                     ___    __                   __      
                   /'___`\ /\ \__               /\ \__   
  ___ ___     ____/\_\ /\ \\ \ ,_\    __   __  _\ \ ,_\  
/' __` __`\  /',__\/_/// /__\ \ \/  /'__`\/\ \/'\\ \ \/  
/\ \/\ \/\ \/\__, `\ // /_\ \\ \ \_/\  __/\/>  </ \ \ \_ 
\ \_\ \_\ \_\/\____//\______/ \ \__\ \____\/\_/\_\ \ \__\
 \/_/\/_/\/_/\/___/ \/_____/   \/__/\/____/\//\/_/  \/__/

Convert time in milliseconds to a human-readable string.

*/

(function (root, factory) {

    const version = '1.0.1';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = {
            ...factory(), 
            version
        };
    } else {
        const output = factory();
        root.ms2text = output.ms2text;
        Object.defineProperties(root.ms2text, {
            getLanguage: {
                value: output.getLanguage
            },
            setLanguage: {
                value: output.setLanguage
            },
            version: {
                value: version,
                enumerable: false
            }
        });
    }
}(typeof self !== 'undefined' ? self : this, function () {
    /**
     * ```js
     * Math.round(b * Math.round(a) / c) / b
     * ```
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     * @returns {number}
     */
    function calc(a, b, c) {
        return Math.round(b * Math.round(a) / c) / b;
    }

    /**
     * @typedef {{comma: string, and: string, spaces: boolean, useOneWordAtStartIfOne: boolean, useOneWordIfOne: boolean, wordThenNumber: boolean}} Rules
     * 
     * @typedef {Object} WordKeys
     * @property {string?} any
     * @property {string?} oneWordPrefix
     * 
     * @typedef {WordKeys & Object<string, string>} Word
     * 
     * @typedef {{years: Word, months: Word, weeks: Word, days: Word, hours: Word, minutes: Word, seconds: Word}} Words
     * 
     * @typedef {undefined|{rules: Rules, words: Words}} Language
     */
    const languages = {
        en: {
            words: {
                years: {
                    11: 'years',
                    21: 'years',
                    31: 'years',
                    41: 'years',
                    51: 'years',
                    61: 'years',
                    71: 'years',
                    81: 'years',
                    91: 'years',
                   '01':'years',
                    1: 'year',
                    any: 'years',
                    oneWordPrefix: 'a ',
                },
                months: {
                    11: 'months',
                    21: 'months',
                    31: 'months',
                    41: 'months',
                    51: 'months',
                    61: 'months',
                    71: 'months',
                    81: 'months',
                    91: 'months',
                   '01':'months',
                    1: 'month',
                    any: 'months',
                    oneWordPrefix: 'a ',
                },
                weeks: {
                    11: 'weeks',
                    21: 'weeks',
                    31: 'weeks',
                    41: 'weeks',
                    51: 'weeks',
                    61: 'weeks',
                    71: 'weeks',
                    81: 'weeks',
                    91: 'weeks',
                   '01':'weeks',
                    1: 'week',
                    any: 'weeks',
                    oneWordPrefix: 'a ',
                },
                days: {
                    11: 'days',
                    21: 'days',
                    31: 'days',
                    41: 'days',
                    51: 'days',
                    61: 'days',
                    71: 'days',
                    81: 'days',
                    91: 'days',
                   '01':'days',
                    1: 'day',
                    any: 'days',
                    oneWordPrefix: 'a ',
                },
                hours: {
                    11: 'hours',
                    21: 'hours',
                    31: 'hours',
                    41: 'hours',
                    51: 'hours',
                    61: 'hours',
                    71: 'hours',
                    81: 'hours',
                    91: 'hours',
                   '01':'hours',
                    1: 'hour',
                    any: 'hours',
                    oneWordPrefix: 'an '
                },
                minutes: {
                    11: 'minutes',
                    21: 'minutes',
                    31: 'minutes',
                    41: 'minutes',
                    51: 'minutes',
                    61: 'minutes',
                    71: 'minutes',
                    81: 'minutes',
                    91: 'minutes',
                   '01':'minutes',
                    1: 'minute',
                    any: 'minutes',
                    oneWordPrefix: 'a '
                },
                seconds: {
                    11: 'seconds',
                    21: 'seconds',
                    31: 'seconds',
                    41: 'seconds',
                    51: 'seconds',
                    61: 'seconds',
                    71: 'seconds',
                    81: 'seconds',
                    91: 'seconds',
                   '01':'seconds',
                    1: 'second',
                    any: 'seconds',
                    oneWordPrefix: 'a '
                }
            },
            rules: {
                comma: ', ',
                and: ' and ',
                spaces: true,
                useOneWordAtStartIfOne: true,
                useOneWordIfOne: false,
                wordThenNumber: false,
                reverse: false,
            }
        },
        ru: {
            words: {
                years: {
                    11: 'лет',
                    12: 'лет',
                    13: 'лет',
                    14: 'лет',
                    1: 'год',
                    2: 'года',
                    3: 'года',
                    4: 'года',
                    any: 'лет'
                },
                months: {
                    11: 'месяцев',
                    12: 'месяцев',
                    13: 'месяцев',
                    14: 'месяцев',
                    1: 'месяц',
                    2: 'месяца',
                    3: 'месяца',
                    4: 'месяца',
                    any: 'месяцев'
                },
                weeks: {
                    11: 'неделей',
                    12: 'неделей',
                    13: 'неделей',
                    14: 'неделей',
                    1: 'неделя',
                    2: 'недели',
                    3: 'недели',
                    4: 'недели',
                    any: 'неделей'
                },
                days: {
                    11: 'дней',
                    12: 'дней',
                    13: 'дней',
                    14: 'дней',
                    1: 'день',
                    2: 'дня',
                    3: 'дня',
                    4: 'дня',
                    any: 'дней'
                },
                hours: {
                    11: 'часов',
                    12: 'часов',
                    13: 'часов',
                    14: 'часов',
                    1: 'час',
                    2: 'часа',
                    3: 'часа',
                    4: 'часа',
                    any: 'часов'
                },
                minutes: {
                    11: 'минут',
                    12: 'минут',
                    13: 'минут',
                    14: 'минут',
                    1: 'минута',
                    2: 'минуты',
                    3: 'минуты',
                    4: 'минуты',
                    any: 'минут'
                },
                seconds: {
                    11: 'секунд',
                    12: 'секунд',
                    13: 'секунд',
                    14: 'секунд',
                    1: 'секунда',
                    2: 'секунды',
                    3: 'секунды',
                    4: 'секунды',
                    any: 'секунд'
                }
            },
            rules: {
                comma: ', ',
                and: ' и ',
                spaces: true,
                useOneWordAtStartIfOne: true,
                useOneWordIfOne: false,
                wordThenNumber: false,
                reverse: false,
            }
        }
    }
    /**
     * @param {string} lang Language code (`en`/`ru`/...) 
     * @returns {Language}
     */
    function getLanguage(lang) {
        return languages[lang];
    }
    /**
     * @param {string} lang Language code (`en`/`ru`/...)
     * @param {Language} data 
     * @returns {Language}
     */
    function setLanguage(lang, data) {
        languages[lang] = typeof data == 'object' ? Array.isArray(data) ? (()=>{
            throw new TypeError('ms2text: Invalid type of translations.');
        })() : data : (()=>{
            throw new TypeError('ms2text: Invalid type of translations.');
        })();
        return languages[lang];
    }

    /**
     * @param {{years: number, months: number, weeks: number, days: number, hours: number, minutes: numbers, seconds: number}} numbers 
     * @param {string} lang 
     * @returns {string}
     */
    function stringify(numbers, lang = 'en') {
        if (!languages[lang]) throw new Error('ms2text: Invalid language');
        const {years, months, weeks, days, hours, minutes, seconds} = numbers;
        let code = [];
        const words = {
            years: 'years',
            months: 'months',
            weeks: 'weeks',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds'
        };
        let useWeeks = false;
        if (years > 0) code.push(words.years);
        if (months > 0) code.push(words.months);
        if (days > 0) {
            if (weeks > 0 && days % 7 == 0) {
                useWeeks = true;
                code.push(words.weeks);
            } else code.push(words.days);
        };
        if (hours > 0) code.push('hours');
        if (minutes > 0) code.push('minutes');
        if (seconds > 0) code.push('seconds');
        const output = [];
        if (languages[lang].rules.reverse) code = code.reverse();
        for (const word of code) {
            const number = numbers[word];
            const words = languages[lang].words[word];
            if (number == 1 && (
                (languages[lang].rules.useOneWordAtStartIfOne && output.length == 0 && code.length > 1) ||
                languages[lang].rules.useOneWordIfOne
            )) {
                output.push((words.oneWordPrefix ?? '') + (words[1] ?? words.any));
                continue;
            }
            for (const [key, value] of Object.entries(words)) {
                if (key == 'oneWordPrefix') continue;
                const space = languages[lang].rules.spaces ? ' ' : '';
                if (key == 'any') {
                    output.push(
                        languages[lang].rules.wordThenNumber ? value + space + String(number)
                        : String(number) + space + value
                    );
                    break;
                } else if (String(number).endsWith(String(key))) {
                    output.push(
                        languages[lang].rules.wordThenNumber ? value + space + String(number)
                        : String(number) + space + value
                    );
                    break;
                }
            }
        };
        const separator = 
            languages[lang].rules.comma ?? 
            languages[lang].rules.and ?? '';
        let outstr = output.length > 1
            ? output.slice(0, -2).join(separator) + 
                (output.length > 2 ? separator : '') + output.slice(-2).join(
                    languages[lang].rules.and ??
                    languages[lang].rules.comma ?? ''
                )
            : output[0] || '';
        outstr = outstr.split('');
        outstr[0] = outstr[0]?.toUpperCase();
        return outstr.join('');
    }

    /**
     * ---
     * 
     * Converts time in milliseconds to a human-readable string.
     * 
     * `time` - Time in milliseconds (`number`)
     * 
     * ---
     * 
     * Example:
     * ```js
     * ms2text(1234567) // '20 minutes and 35 seconds'
     * ```
     * 
     * @example 
     * ms2text(1234567) // '20 minutes and 35 seconds'
     * 
     * @overload
     * @param {number} time Milliseconds
     * @returns {string} Human-readable time string
     */
    /**
     * ---
     * 
     * Converts time in milliseconds to a human-readable string.
     * 
     * `time` - Start date in milliseconds (`number`) 
     * 
     * `to` - End date in milliseconds (`number`)
     * 
     * **Note: start/end date means the number of milliseconds that have elapsed since the Unix Epoch (January 1, 1970, 00:00:00 UTC)**
     * 
     * ---
     * 
     * Example:
     * ```js
     * ms2text(1767123193174, 1767124427741) // '20 minutes and 35 seconds'
     * ```
     * 
     * @example
     * ms2text(1767123193174, 1767124427741) // '20 minutes and 35 seconds'
     * 
     * @overload
     * @param {number} time Start date in milliseconds
     * @param {number} [to] End date in milliseconds
     */
    /**
     * ---
     * 
     * Converts time in milliseconds to a human-readable string.
     * 
     * `time` - Time in milliseconds (`number`)
     * 
     * `to` - The number of days in a month (`number`) (`30` by default) (min: `28`, max: `31`)
     * 
     * `year` - The number of days in a year (`number`) (`365` by default) (min: `360`)
     * 
     * ---
     * 
     * Example:
     * ```js
     * ms2text(1234567, 30, 365) // '20 minutes and 35 seconds'
     * ```
     * 
     * @example
     * ms2text(1234567, 30, 365) // '20 minutes and 35 seconds'
     * 
     * @overload
     * @param {number} time Milliseconds
     * @param {number} [to=30] The number of days in a month to be rounded and used in calculations (`30` by default)
     * @param {number} [year=365] The number of days in a year to be rounded and used in calculations (`365` by default)
     * @param {boolean?} [unlock] Unlock ranges for the number of days in a month and the number of days in a year
     * @returns {string} Human-readable time string
     */
    function main(time, to, year, unlock = false) {
        const assume = {
            month: 30,
            year: 365,
            monthsInYear: 12,
            diff: 5
        };
        let language = 'en';
        if (typeof to == 'string') {
            language = to;
        } else if (typeof year == 'number' && typeof to == 'number') {
            if (to >= 28 && to <= 31 && (typeof unlock == 'boolean' && unlock)) assume.month = Math.round(to);
            else throw new RangeError('ms2text: Invalid number of days in a month.');

            if (year >= 360 && (typeof unlock == 'boolean' && unlock)) assume.year = Math.round(year);
            else throw new RangeError('ms2text: Invalid number of days in a year.');

            if (typeof unlock == 'string') {
                language = unlock;
            }
        } else if (typeof year == 'string') {
            language = year;
        }
        assume.diff = assume.year - assume.month * assume.monthsInYear;
        const isRange = typeof to == 'number' && typeof year != 'number';
        const diff = isRange ? (
            time > to ? time - to : 
            time < to ? to - time : 
            0
        ) : time;
        const as = {
            seconds: Math.round(diff / 1000),
        };
        as.minutes = calc(as.seconds, 10, 60);
        as.hours = calc(as.minutes, 100, 60);
        as.days = calc(as.hours, 1000, 24);
        const calced = {
            seconds: as.seconds % 60
        };

        calced.minutes = calc((diff - calced.seconds * 1000) / 1000, 10, 60) % 60;
        calced.hours = calc(Math.round((diff - calced.minutes * 1000 * 60 - calced.seconds * 1000) / 1000) / 60, 100, 60) % 24;

        if (isRange && diff > 0) {
            const date1 = new Date(time > to ? time : to);
            const date2 = new Date(time > to ? to : time);
            calced.years = date1.getFullYear() - date2.getFullYear();
            calced.months = date1.getMonth() - date2.getMonth();
            calced.days = date1.getDate() - date2.getDate();
            if (calced.days < 0) {
                calced.months -= 1;
                calced.days = assume.month + calced.days;
            }
            if (calced.months < 0) {
                calced.years -= 1;
                calced.months = assume.monthsInYear + calced.months;
            }
        } else {
            calced.days = calc(Math.round((diff - calced.hours * 1000 * 60 * 60 - calced.minutes * 1000 * 60 - calced.seconds * 1000) / 1000) / 60 / 60, 1000, 24);
            
            calced.months = calc(
                Math.round((
                    diff - calced.days % assume.month * 1000 * 60 * 60 * 24 - 
                    calced.hours * 1000 * 60 * 60 -
                    calced.minutes * 1000 * 60 -
                    calced.seconds * 1000
                ) / 1000) / 60 / 60 / 24, 
                10000, 
                assume.month
            );

            calced.years = calc(
                Math.round((
                    diff - calced.days % assume.year * 1000 * 60 * 60 * 24 -
                    calced.hours * 1000 * 60 * 60 -
                    calced.minutes * 1000 * 60 -
                    calced.seconds * 1000
                ) / 1000) / 60 / 60 / 24,
                100000,
                assume.year
            );

            if (calced.years > 0) {
                calced.months = (calced.months - assume.diff * calced.years / assume.month) % assume.monthsInYear;
            }

            if (calced.months > 0) calced.days %= assume.month;
            if (calced.months % 1 > 0) {
                calced.days = Math.round((
                    diff - (calced.years * assume.year + calced.months * assume.month) * 1000 * 60 * 60 * 24
                ) / 1000) / 60 / 60 / 24 * 1.4;
            }
        }

        return stringify({
            years: Math.floor(calced.years),
            months: Math.floor(calced.months),
            weeks: Math.floor(Math.floor(calced.days) / 7),
            days: Math.floor(calced.days),
            hours: Math.floor(calced.hours),
            minutes: Math.floor(calced.minutes),
            seconds: Math.floor(calced.seconds)
        }, language);
    }

    let output = {
        ms2text: main
    };
    if (!(typeof define === 'function' && define.amd)) output = {
        ...output, 
        getLanguage, setLanguage
    };
    return output; 
}));
