const changeModalState = (state) => {

    const paintingSize = document.querySelector('#size');
    const paintingMaterial = document.querySelector('#material');
    const additionalOptions = document.querySelector('#options');

    function bindActionToElems (elem, prop) {
        // elem.forEach((item, i) => {
            elem.addEventListener('change', () => {
                state[prop] = elem.value;
                // state[prop] = e.target.innerText.split('\n')[index];
                // state[prop] = e.target
                // state[prop] = e.target.childNodes;
                // console.log(e.target.innerText.split('\n'))
                // console.log(e.target.childNodes)
                // console.log(state);
            });
        // });
    }

    bindActionToElems(paintingSize, 'size');
    bindActionToElems(paintingMaterial, 'material');
    bindActionToElems(additionalOptions, 'options');
}
export default changeModalState;


// if (elem.length > 1) {
//     state[prop] = i; 
// } else {
//     state[prop] = item.value;
// }
// console.log(state);