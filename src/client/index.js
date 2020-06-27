import {getTravelInfo} from './js/app';
import {toggleTravelInfo} from './js/app';
import './styles/style.scss';

// Event Listeners
const button = document.getElementById('travelInfoButton');
button.addEventListener('click', (event) => {
    toggleTravelInfo("none");
    getTravelInfo(event);
});

export {
    getTravelInfo,
    toggleTravelInfo
}

