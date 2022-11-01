const calc = (size, material, options, promocode, result, state) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины'
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
            state['sum'] = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
            state['sum'] = sum;
        }
    };
    sizeBlock.addEventListener('change', () => {
        calcFunc()
    });
    materialBlock.addEventListener('change', () => {
        calcFunc()
    });
    optionsBlock.addEventListener('change', () => {
        calcFunc()
    });
    promocodeBlock.addEventListener('input', () => {
        calcFunc()
    });

    // let state = {};
    // let hasPromocode = 1;

    // function bindActionToElems (elem, prop) {
    //     elem.addEventListener('change', () => {
    //         state[prop] = elem.value;
    //         console.log(state);
    //     });
    //     console.log(state.size);
    //     if (state.size && state.material && state.options) {
    //         console.log(state.size);
    //         promocodeBlock.addEventListener('input', (e) => {
    //             if (e.target.value === 'IWANTPOPART') {
    //                 hasPromocode = 0.7;
    //                 console.log(hasPromocode);
    //                 sum = ((+state.size) * (+state.material) + +state.options)
    //                 resultBlock.textContent = sum
    //             }
    //         })
    //     }
    // };
    
    // console.log(state);
    // sum = ((+state.size) * (+state.material) + +state.options)
    // resultBlock.textContent = sum;
    // bindActionToElems(sizeBlock, 'size');
    // bindActionToElems(materialBlock, 'material');
    // bindActionToElems(optionsBlock, 'options');
};
export default calc;