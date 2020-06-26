import './styles/style.scss';

// Main Function
const getTravelInfo = (city) => {
    // const city = document.getElementById('city').value;
    const data = {
        city
    };
    postData('http://localhost:3000/travelInfo', data)
        .then((response) => console.log(response));
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

getTravelInfo('Wilhermsdorf');
