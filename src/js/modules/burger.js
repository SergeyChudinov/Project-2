const burger = (burgerSelector, menuSelector) => {
    const burgerElem = document.querySelector(burgerSelector);
    const menuElem = document.querySelector(menuSelector);

    menuElem.style.display = 'none';

    burgerElem.addEventListener('click', () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = 'block';
        } else {
            menuElem.style.display = 'none';
        }        
    });
    window.addEventListener('resize', () => {  //когда меняем ширину экрана
        if (window.screen.availWidth > 992) {
            menuElem.style.display = 'none';
        }
    });
};
export default burger;