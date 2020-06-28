import {getTravelInfo} from './js/app';
import {toggleTravelInfo} from './js/app';
import {isValidCity} from './js/validateCity';
import './styles/style.scss';

// Event Listeners
window.addEventListener('DOMContentLoaded', (event) => {
    const button = document.getElementById('travelInfoButton');
    button.addEventListener('click', (event) => {
    toggleTravelInfo("none");
    getTravelInfo(event);
    });
});


export {
    getTravelInfo,
    toggleTravelInfo,
    isValidCity
}

