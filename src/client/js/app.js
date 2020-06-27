// Global variables
const locationImage = new Image();
locationImage.height = 150;

// Main Function
export const getTravelInfo = (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const data = {
        city,
        date
    };
    postData('http://localhost:3000/travelInfo', data)
        .then((response) => {
            console.log('There is your travel info: ', response);
            if (response.error) {
                showErrorMessage(response.error);
            } else {
                showResult(response);
            }
        })
        .catch (error => showErrorMessage(error));
}

export const toggleTravelInfo = (toggle) => {
    document.getElementById('travelInfo').style.display = toggle;
}

// Helper Functions
const showResult = (response) => {
    document.getElementById('countdown').innerHTML = response.countdown;
    document.getElementById('temp').innerHTML = response.weather.temperature;
    document.getElementById('description').innerHTML = response.weather.description;
    const imgElement = document.getElementById('image');
    locationImage.src = response.image;
    imgElement.appendChild(locationImage);
    toggleTravelInfo("block");
}

const showErrorMessage = (error) => {
    const modal = document.getElementById('errorModal');
    document.getElementById('errorMessage').innerHTML = error;
    modal.style.display = "block";
    document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {if (event.target !== modal) {modal.style.display = 'none';}});
}

// Fetch Functions
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const locationData = await response.json();
        return locationData;
    } catch (error) {
        console.log('An error occurred while updating the location info: ', error);
    }
}