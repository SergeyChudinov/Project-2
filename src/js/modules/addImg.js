import {getResource} from '../services/requsets';

const addImg = () => {
    const addImgButton = document.querySelector('.addImg');
    const img = document.querySelector('.getImg');
    img.style.cssText = 'width: 200px; hight: 200px';

    addImgButton.addEventListener('click', () => {
        getResource('http://localhost:3000/img')
            .then(data => {
                if (data.length !== 0) {
                    console.log(data)
                    img.src = data[0].data
                }               
            });
    });
};
export default addImg;