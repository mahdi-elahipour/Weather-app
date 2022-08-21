const name = document.querySelector("#name");
const wind = document.querySelector("#wind");
const temp = document.querySelector("#temp");
const status = document.querySelector("#status");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const dateTime = document.querySelector("#date-time");
const weatherStatus = document.querySelector("#weather-status");
const city = document.querySelector("#city");
const showWeather = document.querySelector("#show-weather");
const time = new Date;
const H = time.getHours();
const M = time.getMinutes();
const S = time.getSeconds();
const dayOnWeek = time.getDay();

String.prototype.toPersianDigits = function () {
    let id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (Word) {
        return id[+Word]
    });
}


const currentWeathers = [
    { en: 'clear sky', fa: 'آسمان صاف' },
    { en: 'few clouds', fa: 'کمی تا قسمتی ابری' },
    { en: 'scattered clouds', fa: 'ابرهای پراکنده' },
    { en: 'broken clouds', fa: 'تکه ابرها' },
    { en: 'shower rain', fa: 'ابرهای باران زا' },
    { en: 'rain', fa: 'بارانی' },
    { en: 'thunderstorm', fa: 'رعد و برق' },
    { en: 'snow', fa: 'برفی' },
    { en: 'mist', fa: 'گرد غبار' }
]




city.addEventListener("keydown", () => {
    if (event.key === 'Enter')
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=12bc9b7ddb49f51491861987cec4cab2`)
            .then(response => response.ok?response.json():showWeather.innerHTML='سرور پاسخ نداد',showWeather.style.fontWeight='bold')
            .then(result => {
                showWeather.style.display = 'flex';

                const farenheit = parseInt(result.main.temp / 3.8);
                temp.innerHTML = ` میزان حرارت ${fToS(farenheit).toFixed()} درجه سلسیوس `.toPersianDigits();
                name.innerHTML = result.name;
                status.innerHTML = weatherConditions(currentWeathers) !== undefined ? weatherConditions(currentWeathers) : result.weather[0].description;
                humidity.innerHTML = `رطوبت : ${result.main.humidity} درصد`.toPersianDigits();
                pressure.innerHTML = `فشار : ${result.main.pressure} بار`.toPersianDigits();
                wind.innerHTML = `باد : ${result.wind.deg} درجه با سرعت ${result.wind.speed} کیلومتر بر ساعت`.toPersianDigits();;

                weatherStatus.style.background = `url(http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png)`;
                weatherStatus.style.backgroundRepeat = `no-repeat`;

                dateTime.innerText = `${dayName(dayOnWeek)} ${S} : ${M} : ${H}`;
                function weatherConditions(weathers) {
                    const obj = weathers.map((w) => w.en === result.weather[0].description && w.fa)
                    const newObj = new Set(obj);
                    return [...newObj][0] ? [...newObj][0] : [...newObj][1]
                }
            })
           
            .catch(function (error) {

                showWeather.style.display = 'none';
            })

})



function fToS(farenheit) {
    return (farenheit - 32) * 5 / 9;
}

function dayName(day) {
    let stringDay = '';
    switch (day) {
        case 0:
            stringDay = 'یکشنبه';

            break;
        case 1:
            stringDay = 'دوشنبه';

            break;
        case 2:
            stringDay = 'سه شنبه';
            break;
        case 3:
            stringDay = 'چهارشنبه';

            break;
        case 4:
            stringDay = 'پنجشنبه';

            break;
        case 5:
            stringDay = 'جمعه';

            break;
        case 6:
            stringDay = 'شنبه';

            break;
        default:
            break;
    }
    return stringDay;
}