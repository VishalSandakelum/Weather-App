const APIKEY = '7e75a14025d5437085f61907241703';
const city = /*$('.cityinput').val()*/'Galle';
const days = ['2024-03-16'];
const currentweatherurl = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}`;
const forecasturl = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}`;
//const historyweatherurl = `https://api.weatherapi.com/v1/history.json?key=${APIKEY}&q=${city}&dt=${days}`;

$('.searchbtn').click(function(){
    console.log('searching ...');
    getWeather();
    clearArray();
    printThisWeekDaysFromMonday();
    getWeeklyHistoryTemprature();
});

function getWeather(){
    fetch(currentweatherurl)
    .then((response) => response.json())
    .then((data) => {
        displayWeather(data);
    })
    .catch((error) => {
        console.log(error);
    });
}

function displayWeather(data) {
    console.log(data.current.temp_c)
    $('.weatherimg').attr('src',data.current.condition.icon);
}

function getHistoryWeather(url){
    console.log('weather');
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log('weather');
        displayHistoryWeather(data);
    })
    .catch((error) =>{
        console.log(error);
    });
}

function displayHistoryWeather(data){
    console.log(data.forecast.forecastday[0].date);
    console.log(data.forecast.forecastday[0].day.avgtemp_c);
    let temperature = {
        date : `${data.forecast.forecastday[0].date}`,
        temp : `${data.forecast.forecastday[0].day.avgtemp_c}`
    }
    RandomArray.push(temperature);
    console.log('Data');
    console.log(RandomArray);
    console.log(data);
}

function getWeeklyHistoryTemprature(){
    let historyweatherurl;
    for(i = 0; i < DaysofWeekArray.length; i++){
        historyweatherurl = `https://api.weatherapi.com/v1/history.json?key=${APIKEY}&q=${city}&dt=${DaysofWeekArray[i]}`;
        console.log('wea1');
        getHistoryWeather(historyweatherurl);
        console.log('wea2');
    }
}