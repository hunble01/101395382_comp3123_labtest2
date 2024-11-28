import axios from "axios";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: process.env.REACT_APP_API_KEY,
                units: "metric",
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data.message);
        } else {
            console.error("Network Error:", error.message);
        }
        throw error;
    }
};

