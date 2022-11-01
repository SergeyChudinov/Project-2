import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';

import changeModalState from './modules/changeModalState';

window.addEventListener('DOMContentLoaded', () => {
    "use strict";
    let modalState = {};

    changeModalState(modalState);
    modals();
    sliders('.main-slider-item', 'vertical');
    sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
    forms(modalState);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    // showMoreStyles('.button-transparent', '.styles-2'); // 1-2
    showMoreStyles('.button-transparent', '#styles .row'); // 3
    calc('#size', '#material', '#options', '.promocode', '.calc-price', modalState);
});

