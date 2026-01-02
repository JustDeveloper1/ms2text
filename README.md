# `ms2text`
Convert time in milliseconds to a human-readable string. <br>
An UMD-module with fully typed API.

## Installation
npm:
```bash
npm i ms2text
```

browsers / static website:
```html
<!-- In HTML <head> -->
<script src="https://unpkg.com/ms2text" crossorigin="anonymous"></script>
```

## Usage
node.js:
```js
const { ms2text } = require('ms2text');
ms2text(1234567); // 20 minutes and 35 seconds
```

browsers / static website:
```js
ms2text(1234567); // 20 minutes and 35 seconds
```
<br>

**Languages** <br>
You can select output language of defined languages (see [Custom languages](#custom-languages)):

node.js:
```js
const { ms2text } = require('ms2text');
ms2text(1234567, 'ru'); // 20 минут и 35 секунд
```

browsers / static website:
```js
ms2text(1234567, 'ru'); // 20 минут и 35 секунд
```
<br>

**UNIX Timestamp range** <br>
node.js:
```js
const { ms2text } = require('ms2text');
ms2text(1767123193174, 1767124427741); // 20 minutes and 35 seconds

/* You can also specify output language:
 * ms2text(1767123193174, 1767124427741, 'ru'); // 20 минут и 35 секунд
 */
```

browsers / static website:
```js
ms2text(1767123193174, 1767124427741); // 20 minutes and 35 seconds

/* You can also specify output language:
 * ms2text(1767123193174, 1767124427741, 'ru'); // 20 минут и 35 секунд
 */
```
<br>

**Adjust calculations** <br>
You can specify the number of days in a month (`30` by default) and the number of days in a year (`365` by default):

node.js:
```js
const { ms2text } = require('ms2text');
ms2text(
    1234567, 
    30, // Days in a month
    365 // Days in a year
); // '20 minutes and 35 seconds'

/* You can also specify output language:
 * ms2text(1234567, 30, 365, 'ru'); // 20 минут и 35 секунд
 */
```

browsers / static website:
```js
ms2text(
    1234567, 
    30, // Days in a month
    365 // Days in a year
); // '20 minutes and 35 seconds'

/* You can also specify output language:
 * ms2text(1234567, 30, 365, 'ru'); // 20 минут и 35 секунд
 */
```

> **q:** Why can't I specify these numbers in UNIX Timestamp range? <br>
> **a:** It looks at the actual number of days in each month and the number of days in each year, so you don't need to adjust the calculations.

### Custom languages
Currently (In `v1.0.1`), by default, there are already **`'en'` (English, default)** and **`'ru'` (Russian)**. <br>
But you can also define other languages or redefine the built-ins:
```js
const exampleLang = {
    words: {
        years: {
            11: 'years',
            1: 'year',
            /*
             * It looks at the number as a string and checks if it ends with a number/string that matches the key. If it does, then the word is the value of that key.
             * If there is no such key, it uses the word in "any".
             * 
             * Top = more priority
             * Bottom = less priority
             */

            any: 'years', // Should be plural
            oneWordPrefix: 'a ' /* Optional. "1 year" -> "a year" (or you can leave it empty to make it "1 year" -> "year").
                                 * Note: The first character of output will be uppercased.
                                 * This will be used if `rules.useOneWordIfOne` and/or `rules.useOneWordAtStartIfOne`.
                                 */
        },
        months: {
            11: 'months',
            1: 'month',
            any: 'months',
            oneWordPrefix: 'a '
        },
        weeks: {
            11: 'weeks',
            1: 'week',
            any: 'weeks',
            oneWordPrefix: 'a '
        },
        days: {
            11: 'days',
            1: 'day',
            any: 'days',
            oneWordPrefix: 'a '
        },
        hours: {
            11: 'hours',
            1: 'hour',
            any: 'hours',
            oneWordPrefix: 'an '
        },
        minutes: {
            11: 'minutes',
            1: 'minute',
            any: 'minutes',
            oneWordPrefix: 'a '
        },
        seconds: {
            11: 'seconds',
            1: 'second',
            any: 'seconds',
            oneWordPrefix: 'a '
        }
    },
    rules: {
        comma: ', ', // Separator ("A year, 4 days (...)"). It will use `rules.and` if this is not specified.
        and: ' and ', // Last separator ("(...) 20 minutes and 35 seconds"). It will use `rules.comma` if this is not specified.
        // It will not add any separator if both `rules.comma` and `rules.and` are not specified.

        spaces: true, // Add space between number and word ("5 days").

        useOneWordIfOne: false, // Use one word if the number is 1.
        useOneWordAtStartIfOne: true, // Use one word if the number is 1 and this is the first word in output string.
        // It will add a prefix if specified in `words{}`.

        wordThenNumber: false, // Reverse "5 days" to "days 5".

        reverse: false, /* Reverse from Years>Months>...>Minutes>Seconds to Seconds>Minutes>...>Months>Years.
                         * ("A year, 4 days, 20 minutes and 35 seconds" -> "35 seconds, 20 minutes, 4 days and a year")
                         */
    }
}
```

node.js:
```js
const { getLanguage, setLanguage } = require('ms2text');
setLanguage(
    'example', // Language name/code
    exampleLang
); // Returns language object (`exampleLang`).

getLanguage('example'); // Returns language object or undefined if the language has not been defined.
```

browsers / static website:
```js
ms2text.setLanguage(
    'example', // Language name/code
    exampleLang
); // Returns language object (`exampleLang`).

ms2text.getLanguage('example'); // Returns language object or undefined if the language has not been defined.
```

---
## `.min.js`
For `.min.js`, I use [UglifyJS](https://github.com/mishoo/UglifyJS) by [Mihai Bazon](https://github.com/mishoo).
```bash
npm i uglify-js
```
```bash
uglifyjs index.js -c -m "reserved=['ms2text','getLanguage','setLanguage']" -o index.min.js
```
