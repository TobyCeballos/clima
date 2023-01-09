class Weather {
    constructor(city) {
        this.apikey = 'f773b3b125d2778b7d9971eeb2ce77d7'
        this.city = city
    }

    async getWeather() {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apikey}`
        const data = await fetch(URL)
        return data
    }
}

module.exports = Weather()