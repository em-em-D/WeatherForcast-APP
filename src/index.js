import './style.scss';

const date = document.querySelector('.date');
const time = document.querySelector('.time');
const hum = document.querySelector('.humidity');
const pres = document.querySelector('.pressure');
const wind = document.querySelector('.wind');
const temp = document.querySelector('.temprature');
const degreebtn = document.querySelectorAll('.buts > button');
const cloud = document.querySelector('.clouds');
const btn = document.querySelector('button');
const input = document.querySelector('input');
const mini_Temp = document.querySelector('.mintemp');
const maxi_Temp = document.querySelector('.maxtemp');
const display = document.querySelector('#weather');
const h = document.querySelector('h1');
const weatherContainer = document.querySelector('.weather');
const city = document.querySelector('h2');
const today = new Date();

let weatherData;
async function weatherInfo(){
   let data = await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value},forecast?id=524901&APPID=674a2431b0b48b1ff9777f74e58d3b58`)).json();
    weatherData = data
    resultdata(data);
    return data;
}

btn.addEventListener('click', async f => {
    f.preventDefault();
    await weatherInfo();
    DateandTime();
    input.value = '';
    
});

degreebtn.forEach(btn =>{
    btn.addEventListener('click', f =>{
        f.preventDefault();
        if(btn.textContent === '°F'){
            f.currentTarget.classList.toggle('active');
            degreebtn[0].classList.remove('active');
            resultdata(weatherData, 'Farenheit');
        }else if (btn.textContent === '°C'){
            f.currentTarget.classList.toggle('active');
            degreebtn[1].classList.remove('active');
            resultdata(weatherData, 'celsius');
        }

    });
});

function DateandTime(){
    date.textContent = `${thisDate().month} ${today.getDate()}, ${today.getFullYear()} - ${
        thisDate().day
    }`;
    time.textContent = `${today.getHours()}:${today.getUTCMinutes()}`;
}

function resultdata(data, degreeTemp = 'farenheit'){

    const celsius = Math.round(data.main.temp - 273.2);
    const Farenheit = Math.round(celsius * (9/5) + 32);

    const maxCelsius = Math.round(data.main.temp_max - 273.2);
    const maxFarenheit = Math.round(celsius * (9/5) + 32);

    const minCelsius = Math.round(data.main.temp_min - 273.2);
    const minFarenheit = Math.round(celsius * (9/5) + 32);

  // Console.log(data);
   h.textContent = `${data.name},${data.sys.country}`;
   pres.textContent = `Pressure: ${data.main.pressure}hpa`;
   hum.textContent = `Humidity: ${data.main.humidity}%`;
   wind.textContent = `Wind:${data.wind.speed} km/h`;
   if (degreeTemp === 'farenheit'){
       temp.textContent = `${Farenheit} °F`;
       mini_Temp.textContent = `${minFarenheit}`;
       maxi_Temp.textContent = `${maxFarenheit}`;
   }else{
    temp.textContent = `${celsius} °C`;
    mini_Temp.textContent = `${minCelsius}`;
    maxi_Temp.textContent = `${maxCelsius}`;
   }
   cloud.textContent =`Cloudiness: ${data.clouds.all}%`;
   display.getElementsByClassName.display = 'flex';


}

function thisDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[today.getDay()];

    const months = [
        'January','February','March','April','May','June','July','August','September','October','November','December',
    ];
    const month = months[today.getMonth()];
    return { day, month };
}