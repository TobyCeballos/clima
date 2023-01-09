
const API_KEY = 'f773b3b125d2778b7d9971eeb2ce77d7'




const fetchData = position => {
    const { latitude, longitude } = position.coords
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&lang=sp&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
    console.log(position)
}

const setWeatherData = data => {
    console.log(data)
    backgroundModifier(data)

    const weatherData = {
        location: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key]
    })

}

const backgroundModifier = data => {

    const description = data.weather[0].main

    if(description === 'Clouds'){
        document.getElementById("bodyBg").className = 'background-cloudy'
        document.getElementById('icon').textContent = 'clouds'
    }
    
    if(description === 'Rain'){
        document.getElementById("bodyBg").className = 'background-rain'
        document.getElementById('icon').textContent = 'cloudy_snowing'
    }

    if(description === 'Clear'){
        document.getElementById("bodyBg").className = 'background-clear'
        document.getElementById('icon').textContent = 'light_mode'
    }
}

const getDate = () => {
    const date = new Date();

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}


/* SEARCH */

const search = async(query) => {
    try {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${query}&lang=sp&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
        console.log(data)
    } catch (error) {
       return error 
    }
}

const onSubmit = async(event) => {
    event.preventDefault()
    await search(searchbox.value)
} 

const form = document.getElementById('search')
const searchbox = document.getElementById('searchbox')

form.addEventListener('submit', onSubmit, true)


//const city = 'london'
//const fetchWeather = async() => {
//    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
//    const data = await fetch(URL)
//    console.log(data)
//}
//
//document.addEventListener('DOMContentLoaded', fetchWeather())
