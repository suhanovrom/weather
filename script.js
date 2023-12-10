class Weather{
    constructor(){
        this.days = document.querySelectorAll(".days");
        this.cloudy = document.querySelector(".cloudy");
        this.humidity = document.querySelector(".humidity");
        this.wind = document.querySelector(".wind");
        this.atmospher = document.querySelector(".atmospher");
        this.weatherIcon = document.querySelector(".weathericon");
        this.backgroundimg = document.querySelector(".background");
        this.textweather = document.querySelector(".weather")
        document.querySelector("button").addEventListener("click",() => {this.getSearchWeather()}) ;
        this.textDate = document.querySelector(".Date");
        this.city = "Kharkiv"
        this.date = new Date();
        this.textTemperature = document.querySelector("h1");
        this.textcity = document.querySelector(".city");
        this.getWeather();
        
        
    }
    getSearchWeather(){
        this.search = document.querySelector("input");
        this.city = this.search.value;
        this.search.value ="";
        this.getWeather();
    }
    getWeather() {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + `${this.city}` + '&appid=c9b5fa19a461cb876d3e9b002c6844d5')
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(value =>{
                this.lat = value.coord.lat;
                this.lon = value.coord.lon;
                this.getTemperature(value);
                this.getTextDate();
                this.getNameCity(value);
                this.getWeatherCondition(value);
                this.getWeatherDetails(value);
                this.getDays();
                this.getTemperaturefordays(value);
            });
    }
    getTemperaturefordays(value){
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + `${this.lat}` + "&lon=" + `${this.lon}` + "&appid=c9b5fa19a461cb876d3e9b002c6844d5")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
        .then(value =>{
            // console.log(value.daily[1].temp.day);
            // for (let i = 1; i <= this.days.length; i++) {
            //     for(let day of this.days){
            //         day.childNodes[3].childNodes[1].textContent = (value.daily[i].temp.day).toFixed() + "°C";
            //         switch (value.daily[i].weather[0].main) {
            //             case "Clear":
            //                 day.childNodes[3].childNodes[5].textContent = "Clear";
            //                 day.childNodes[3].childNodes[3].src = "images/icons/clear-icon.png";
            //                 break;
            //             case "Clouds":
            //                 day.childNodes[3].childNodes[5].textContent = "Cloudy";
            //                 day.childNodes[3].childNodes[3].src = "images/icons/cloudy-icon.png";
            //                 break;
            //             case "Rain":
            //             case "Thunderstorm":
            //             case "Drizzle":
            //                 day.childNodes[3].childNodes[5].textContent = "Rainy";
            //                 day.childNodes[3].childNodes[3].src = "images/icons/rainy-icon.png";
            //                 break;
            //             case "Snow":
            //                 day.childNodes[3].childNodes[5].textContent = "Snow";
            //                 day.childNodes[3].childNodes[3].src = "images/icons/snow-icon.png";
            //                 break;
            //         }
            //     }

            // }
        });

    }
    getDays(){
        this.i = 1;
        for(let day of this.days){
            day.childNodes[1].textContent = this.getWeekday(this.i);
            
            this.i++
            
        }
    }
    getWeatherDetails(value){
        this.cloudy.textContent = value.clouds.all + "%";
        this.humidity.textContent = value.main.humidity + "%";
        this.wind.textContent = value.wind.speed + "m/s";
        this.atmospher.textContent = value.main.pressure + "hPa";
    }
    getWeatherCondition(value){
        switch (value.weather[0].main) {
            case "Clear":
                this.textweather.textContent = "Clear";
                this.weatherIcon.src = "images/icons/clear-icon.png";
                this.backgroundimg.style.background = "url('images/bg/clear-bg.png')";
                break;
            case "Clouds":
                this.textweather.textContent = "Cloudy";
                this.weatherIcon.src = "images/icons/cloudy-icon.png";
                this.backgroundimg.style.background = "url('images/bg/cloudy-bg.png')";
                break;
            case "Rain":
            case "Thunderstorm":
            case "Drizzle":
                this.textweather.textContent = "Rainy";
                this.weatherIcon.src = "images/icons/rainy-icon.png";
                this.backgroundimg.style.background = "url('images/bg/rainy-bg.png')";
                break;
            case "Snow":
                this.textweather.textContent = "Snow";
                this.weatherIcon.src = "images/icons/snow-icon.png";
                this.backgroundimg.style.background = "url('images/bg/snow-bg.png')";
                break;
        }
    }
    getNameCity(value){
        this.textcity.textContent = value.name;
    }
    getTextDate(){
        this.textDate.textContent = this.date.getDate() + "." + (this.date.getMonth()+1) + " " + this.getWeekday();
    }
    getTemperature(value){
        this.textTemperature.textContent = (value.main.temp - 273.15).toFixed() + "°C";
        this.textTemperature.addEventListener("click", () =>{
            if(this.textTemperature.textContent.includes("°C")){
                this.textTemperature.textContent = ((value.main.temp - 273.15) * (9 / 5) + 32).toFixed()+ "°F";
            }else{
                this.textTemperature.textContent = (value.main.temp - 273.15).toFixed() + "°C";
            }
        });
    }
    getWeekday(value){
        switch(this.date.getDay() + value){
            case 8:
            case 1:
                return "Monday";
                break;
            case 9:
            case 2:
                return "Tuesday";
                break;
            case 10:
            case 3:
                return "Wednesday"
                break;
            case 4:
            case 11:
                return "Thursday";
                break;
            case 5:
            case 12:
                return "Friday";
                break;
            case 6:
                return "Saturday"
                break;
            case 7:
            case 0:
                return "Sunday";
                break;
            default:
                return false;
                break;
        }
        
    }

    
}
let a = new Weather();