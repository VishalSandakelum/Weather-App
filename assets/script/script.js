const APIKEY = '7e75a14025d5437085f61907241703';
let city = 'Canada';
const forecasturl = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}`;
//const historyweatherurl = `https://api.weatherapi.com/v1/history.json?key=${APIKEY}&q=${city}&dt=${days}`;

$('.searchbtn').click(function(){
    console.log('searching ...');
    if($('.cityinput').val()===''){
        city = 'Canada';
        $('.citydetails>:nth-child(1)').text(city);
    }else{
        city = $('.cityinput').val();
        $('.citydetails>:nth-child(1)').text(city);
    }
    defaultFunction();
});

function getWeather(){
    let currentweatherurl = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}`;
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
    console.log('current');
    console.log(data);
    console.log(data.current.temp_c)
    $('.weatherimg').attr('src',data.current.condition.icon);
    $('.citydetails>:nth-child(2)').text(data.current.last_updated);
    $('.temprature>:nth-child(1)').text(data.current.temp_c);
    $('.weatherimgdetails>:nth-child(2)').text(data.current.condition.text);
    $('.cloudy>:nth-child(2)').text(data.current.cloud+'%');
    $('.humidity>:nth-child(2)').text(data.current.humidity+'%');
    $('.wind>:nth-child(2)').text(data.current.wind_kph+'%');
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
    TempArray.push(temperature);
    console.log('Data');
    console.log(TempArray);
    console.log(data);
    if(TempArray.length === DaysofWeekArray.length){
        sortDate();
        chartData();
        console.log(TempArray.length);
    }
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