const changeModalState = (state) => {

    const paintingSize = document.querySelector('#size');
    const paintingMaterial = document.querySelector('#material');
    const additionalOptions = document.querySelector('#options');

    function bindActionToElems (elem, prop) {
        elem.addEventListener('change', () => {
            state[prop] = elem.value;
            console.log(state)
        });
    }

    bindActionToElems(paintingSize, 'size');
    bindActionToElems(paintingMaterial, 'material');
    bindActionToElems(additionalOptions, 'options');
}
export default changeModalState;
