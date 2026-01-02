/*

MIT License

Copyright (c) 2026 JustDeveloper <https://justdeveloper.is-a.dev/>

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

declare module 'ms2text' {
    interface Rules {
        comma: string;
        and: string;
        spaces: boolean;
        useOneWordAtStartIfOne: boolean;
        useOneWordIfOne: boolean;
        wordThenNumber: boolean;
        reverse: boolean;
    }

    interface WordKeys {
        any?: string;
        oneWordPrefix?: string;
        [key: string]: string | undefined;
    }

    interface Words {
        years: WordKeys;
        months: WordKeys;
        weeks: WordKeys;
        days: WordKeys;
        hours: WordKeys;
        minutes: WordKeys;
        seconds: WordKeys;
    }

    interface Language {
        rules: Rules;
        words: Words;
    }

    const exports: {
        
        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `time` - Time in milliseconds (`number`)
         * 
         * ---
         * 
         * @example 
         * ms2text(1234567) // '20 minutes and 35 seconds'
         * 
         * @param time Time in milliseconds
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(time: number): string;

        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `from` - Start date in milliseconds (`number`)
         * 
         * `to` - End date in milliseconds (`number`)
         * 
         * **Note: start/end date means the number of milliseconds that have elapsed since the Unix Epoch (January 1, 1970, 00:00:00 UTC)**
         * 
         * ---
         * 
         * @example
         * ms2text(1767123193174, 1767124427741) // '20 minutes and 35 seconds'
         * 
         * @param from Start date in milliseconds (Unix timestamp)
         * @param to End date in milliseconds (Unix timestamp)
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(from: number, to: number): string;

        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `time` - Time in milliseconds (`number`)
         * 
         * `daysInMonth` - The number of days in a month (`number`) (`30` by default) (min: `28`, max: `31`)
         * 
         * `daysInYear` - The number of days in a year (`number`) (`365` by default) (min: `360`)
         * 
         * ---
         * 
         * @example
         * ms2text(1234567, 30, 365) // '20 minutes and 35 seconds'
         * 
         * @param time Time in milliseconds
         * @param daysInMonth Number of days in a month (28-31, default: 30)
         * @param daysInYear Number of days in a year (≥360, default: 365)
         * @param unlock Unlock ranges for the number of days in a month and the number of days in a year
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(time: number, daysInMonth: number, daysInYear: number, unlock?: boolean): string;

        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `time` - Time in milliseconds (`number`)
         * 
         * `language` - Language code (`'en'`/`'ru'`/...)
         * 
         * ---
         * 
         * @example
         * ms2text(1234567, 'ru') // '20 минут и 35 секунд'
         * 
         * @param time Time in milliseconds
         * @param language Language code (e.g., 'en', 'ru')
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(time: number, language: string): string;

        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `from` - Start date in milliseconds (`number`)
         * 
         * `to` - End date in milliseconds (`number`)
         * 
         * `language` - Language code (`'en'`/`'ru'`/...)
         * 
         * **Note: start/end date means the number of milliseconds that have elapsed since the Unix Epoch (January 1, 1970, 00:00:00 UTC)**
         * 
         * ---
         * 
         * @example
         * ms2text(1767123193174, 1767124427741, 'ru') // '20 минут и 35 секунд'
         * 
         * @param from Start date in milliseconds (Unix timestamp)
         * @param to End date in milliseconds (Unix timestamp)
         * @param language Language code (e.g., 'en', 'ru')
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(from: number, to: number, language: string): string;

        /**
         * ---
         * 
         * Converts time in milliseconds to a human-readable string.
         * 
         * `time` - Time in milliseconds (`number`)
         * 
         * `daysInMonth` - The number of days in a month (`number`) (`30` by default) (min: `28`, max: `31`)
         * 
         * `daysInYear` - The number of days in a year (`number`) (`365` by default) (min: `360`)
         * 
         * `language` - Language code (`'en'`/`'ru'`/...)
         * 
         * ---
         * 
         * @example
         * ms2text(1234567, 30, 365, 'ru') // '20 минут и 35 секунд'
         * 
         * @param time Time in milliseconds
         * @param daysInMonth Number of days in a month (28-31, default: 30)
         * @param daysInYear Number of days in a year (≥360, default: 365)
         * @param language Language code (e.g., 'en', 'ru')
         * @returns Human-readable time string
         * @since 1.0.0
         */
        ms2text(time: number, daysInMonth: number, daysInYear: number, language: string): string;

        /**
         * Get language configuration
         * @param lang Language code (e.g., 'en', 'ru')
         * @returns Language configuration or undefined if not found
         * @since 1.0.0
         */
        getLanguage(lang: string): Language | undefined;

        /**
         * Set or update language configuration
         * @param lang Language code (e.g., 'en', 'ru')
         * @param data Language configuration
         * @returns Updated language configuration
         * @since 1.0.0
         */
        setLanguage(lang: string, data: Language): Language;

    };

    export = exports;
}
