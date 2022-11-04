// const pictureSize = (imgSelector) => {
//     const sizesBlock = document.querySelectorAll(imgSelector);

//     const showPicture = (block) => {
//         const img = block.querySelector('img');
//         const src = img.src.split('.');
//         img.src = `${src[0]}-1.${src[1]}`;
//         block.querySelectorAll('p').forEach(p => {
//             if (!p.classList.contains('sizes-hit')) {
//                 p.style.display = 'none';
//             }         
//         })
//     };

//     const hidePicture = (block) => {
//         const img = block.querySelector('img');
//         img.src = img.src.replace(/-1/, '');
//         block.querySelectorAll('p').forEach(p => {
//             p.style.display = 'block';
//         })
//     };

//     sizesBlock.forEach(block => {
//         block.addEventListener('mouseenter', (e) => {
//             showPicture(e.target);
//         });
//         block.addEventListener('mouseleave', (e) => {
//             hidePicture(e.target);
//         });
//     });
// };
// export default pictureSize;

const pictureSize = (imgSelector) => {
    const blocks = document.querySelectorAll(imgSelector);

    function showImg (block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';                   // написать
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {   // написать
            p.style.display = 'none';
        })
    };

    function hideImg (block) {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';
        block.querySelectorAll('p:not(.sizes-hit)').forEach(p => { 
            p.style.display = 'block';
        })
    };

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {     //mouseover
            showImg(block);
        });
        block.addEventListener('mouseout', () => {      //mouseout
            hideImg(block); 
        });
    });
};
export default pictureSize;
