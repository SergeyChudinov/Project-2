// const calc = (size, material, options, promocode, result, state) => {
//     const sizeBlock = document.querySelector(size);
//     const materialBlock = document.querySelector(material);
//     const optionsBlock = document.querySelector(options);
//     const promocodeBlock = document.querySelector(promocode);
//     const resultBlock = document.querySelector(result);

//     let sum = 0;

//     const calcFunc = () => {
//         sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
//         if (sizeBlock.value == '' || materialBlock.value == '') {
//             resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
//         } else if (promocodeBlock.value === 'IWANTPOPART') {
//             resultBlock.textContent = Math.round(sum * 0.7);
//             state['sum'] = Math.round(sum * 0.7);
//         } else {
//             resultBlock.textContent = sum;
//             state['sum'] = sum;
//         }
//     };
//     sizeBlock.addEventListener('change', () => {
//         calcFunc()
//     });
//     materialBlock.addEventListener('change', () => {
//         calcFunc()
//     });
//     optionsBlock.addEventListener('change', () => {
//         calcFunc()
//     });
//     promocodeBlock.addEventListener('input', () => {
//         calcFunc()
//     });
// };
// export default calc;

import {getResource} from '../services/requsets';

const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);

    let sum = 0,
        sizePrice = null,
        materialPrice = null,
        optionPrice = null;

    const getPrice = async (value, resourse) => {
        const res = await getResource('http://localhost:3000/calc');
        return res[resourse][value];
    }

    const calcFunc = () => {
        if (sizeBlock.value == "empty" || materialBlock.value == "empty") {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            sum = Math.round((+sizePrice * +materialPrice + +optionPrice) * 0.7);
            resultBlock.textContent = sum;
            state['sum'] = sum;
        } else {
            sum = Math.round(+sizePrice * +materialPrice + +optionPrice);
            resultBlock.textContent = sum;
            state['sum'] = sum;
        }
    };
    sizeBlock.addEventListener('change', async (e) => {
        const value = e.target.value
        sizePrice = await getPrice(value, 'size');
        calcFunc();
    });
    materialBlock.addEventListener('change', async (e) => {
        const value = e.target.value
        materialPrice = await getPrice(value, 'material');
        calcFunc();
    });
    optionsBlock.addEventListener('change', async (e) => {
        const value = e.target.value
        optionPrice = await getPrice(value, 'options');
        calcFunc();
    });
    promocodeBlock.addEventListener('input', () => {
        calcFunc();
    });
};
export default calc;

