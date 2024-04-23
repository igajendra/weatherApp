const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const container = document.getElementById("weatherDetails");
// const img= document.getElementById("weatherIcon");
const imageContainer = document.querySelector('.image_Name')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    container.innerHTML = "";
    const location = search.value

    messageOne.textContent = 'Loading...';
    (async () => {
        try {
            const response = await fetch(`/weather?address=${location}`);
            const data = await response.json();
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                const currently = data?.current;

                var weatherDetails = {
                    "Weather Descriptions": currently?.weather_descriptions,
                    "Temperature": currently?.temperature + ' °C',
                    "Humidity": currently?.humidity + ' %',
                    "Wind Speed": currently?.wind_speed + ' km/h',
                    "Day/Night": currently?.is_day == 'yes' ? ' Day' : ' Night',
                    "Cloudcover": currently?.cloudcover,
                    "Feels Like": currently?.feelslike + ' °C',
                    "Precipitation": currently?.precip + ' %',
                    "UV Index": currently?.uv_index,
                    "Visibility": currently?.visibility + ' km'
                };
                for (let key in weatherDetails) {
                    if (weatherDetails.hasOwnProperty(key)) {
                        let p = document.createElement("p");
                        p.textContent = key + ": " + weatherDetails[key];
                        container.appendChild(p);
                    }
                }
                var existingImgTag = imageContainer.querySelector('#weatherIcon');
                const img = document.createElement('img')
                img.id = 'weatherIcon'
                img.alt = 'Weather Icon'
                img.src = currently?.weather_icons[0];
                if (existingImgTag) {
                    imageContainer.replaceChild(img, existingImgTag);
                } else {
                    imageContainer.appendChild(img);
                }

            }
        } catch (error) {
            // console.error('Error fetching weather data:', error);
        }
    })();

})