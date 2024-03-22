const xValues = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

const myChart =  new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [20,22,26,32,22,20,10],
      borderColor: "white",
      fill: false
    },{ 
        data: [0,10,20,30,40,50],
        borderColor: "transparent",
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 0
      }]
  },
  options: {
    legend: {display: false},
    scales: {
        xAxes: [{
          ticks: {
            fontColor: "white"
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: "white"
          }
        }]
      }
  }
});

function defaultFunction(){
    getWeather();
    clearArray();
    
    try {
        printThisWeekDaysFromMonday();
        getWeeklyHistoryTemprature();
    }
    catch(err) {
        console.log(err);
    }
}

function getThisWeekMondayDate() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const mondayDate = new Date(today); // Initialize a new Date object with the current date
    const daysToMonday = dayOfWeek === 0 ? 1 : 1 - dayOfWeek; // Calculate the number of days until Monday (0 for Monday)
    mondayDate.setDate(today.getDate() + daysToMonday); // Set the date to the nearest Monday
    return mondayDate;
}

function printThisWeekDaysFromMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    
    // If today is Monday, print only today's date
    if (dayOfWeek === 1) {
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        console.log("Today's date is:", `${day}/${month}/${year} (Monday)`);
    } else {
        // Print all the days from Monday to today within the same week
        const mondayDate = getThisWeekMondayDate();
        const mondayDay = mondayDate.getDate().toString().padStart(2, '0');
        const mondayMonth = (mondayDate.getMonth() + 1).toString().padStart(2, '0');
        const mondayYear = mondayDate.getFullYear();

        console.log("This week's dates starting from Monday:");
        for (let i = mondayDay; i <= today.getDate(); i++) {
            const formattedDay = i.toString().padStart(2, '0');
            console.log(`${formattedDay}/${mondayMonth}/${mondayYear}`);
            DaysofWeekArray.push(`${mondayYear}-${mondayMonth}-${formattedDay}`);
        }
        console.log(DaysofWeekArray.toString());
    }
}

function clearArray(){
    DaysofWeekArray = null;
    DaysofWeekArray = new Array();
    TemperatureforDateArray = null;
    TemperatureforDateArray = new Array();
    TempArray = null;
    TempArray = new Array();
}

function sortDate(){
    TemperatureforDateArray.length = DaysofWeekArray.length;
    for(sort = 0; sort < DaysofWeekArray.length; sort++){
        console.log('Day'+DaysofWeekArray[sort]);
        console.log('Temp'+TempArray[sort].date);
        if(DaysofWeekArray[sort].toString() === TempArray[sort].date.toString()){
            console.log('Auuu');
            TemperatureforDateArray[sort]=(TempArray[sort]);
        }else{
            console.log('Ava');
            InnerLoop:for(resort = 0; resort < DaysofWeekArray.length; resort++){
                if(DaysofWeekArray[sort].toString() === TempArray[resort].date.toString()){
                    console.log('Avaaa');
                    TemperatureforDateArray[sort] = (TempArray[resort]);
                    break InnerLoop;
                }
            }
        }
    }
    console.log("temperature Array");
    console.log(TemperatureforDateArray);
}

function chartData(){
    myChart.data.datasets[0].data = [];
    for(loop = 0; loop < TemperatureforDateArray.length; loop++){
        addDataToChart(TemperatureforDateArray[loop].temp);
    }
}

function addDataToChart(newData) {
    myChart.data.datasets[0].data.push(newData);
    myChart.update();
}
