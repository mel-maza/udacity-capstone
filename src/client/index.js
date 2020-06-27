import './styles/style.scss';

// Main Function
const getTravelInfo = (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;
    const data = {
        city,
        date
    };
    postData('http://localhost:3000/travelInfo', data)
        .then((response) => console.log('There is your travel info: ', response));
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

// Event Listeners
const button = document.getElementById('travelInfoButton');
button.addEventListener('click', (event) => getTravelInfo(event));

