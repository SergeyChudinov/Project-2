const accordion = (accordionSelector, blockSelector) => {     // 1
    const accordionDiv = document.querySelector(accordionSelector);
    const accordionBlock = document.querySelectorAll(blockSelector);
    const span = document.querySelectorAll('.accordion-heading span');

    let accordionOpened = false;

    function hideText() {
        accordionBlock.forEach(block => {
            block.style.display = 'none';
            block.classList.remove('animated', 'slideInDown');
        });
        document.querySelectorAll('.accordion-heading').forEach(el => {
            el.classList.remove('active-style');
        });
    };
    hideText();

    accordionDiv.addEventListener('click', (e) => {
        const parentNode = e.target.parentNode;
        if (parentNode.classList.contains('accordion-heading')) {
            if (!accordionOpened) {
                parentNode.nextElementSibling.style.display = 'block'; //nextSibling
                parentNode.nextElementSibling.classList.add('animated', 'slideInDown');
                parentNode.classList.add('active-style');
                accordionOpened = true;
            } else {
                if (parentNode.nextElementSibling.style.display === 'none') {
                    hideText();
                    parentNode.nextElementSibling.style.display = 'block';
                    parentNode.nextElementSibling.classList.add('animated', 'slideInDown');
                    parentNode.classList.add('active-style');
                    accordionOpened = true;
                } else {
                    hideText();
                    accordionOpened = false;
                }                
            };           
        };
    });

    // span.forEach(el => {
    //     el.addEventListener('click', function() {
    //         if (!accordionOpened) {
    //             this.parentNode.nextElementSibling.style.display = 'block';
    //             this.parentNode.nextElementSibling.classList.add('animated', 'slideInDown');
    //             this.parentNode.classList.add('active-style');
    //             accordionOpened = true;
    //         } else {
    //             if (el.parentNode.nextElementSibling.style.display === 'none') {
    //                 hideText();
    //                 this.parentNode.nextElementSibling.style.display = 'block';
    //                 this.parentNode.nextElementSibling.classList.add('animated', 'slideInDown');
    //                 this.parentNode.classList.add('active-style');
    //                 accordionOpened = true;
    //             } else {
    //                 hideText();
    //                 accordionOpened = false;
    //             }                
    //         };  
    //     });
    // });
};
export default accordion;

// const accordion = (triggerSelector, itemsSelector) => {   // 2
//     const btns = document.querySelectorAll(triggerSelector);
//     const blocks = document.querySelectorAll(itemsSelector);

//     blocks.forEach(block => {
//         block.classList.add('animated', 'fadeInDown')
//     });

//     btns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             if (!this.classList.contains('active')) {
//                 btns.forEach(btn => {
//                     btn.classList.remove('active', 'active-style');
//                 });
//                 this.classList.add('active', 'active-style');
//             };
//         });
//     });
// };
// export default accordion;

// const accordion = (triggerSelector, itemsSelector) => {   // 3
//     const btns = document.querySelectorAll(triggerSelector);

//     let accordionOpened = false;

//     function hideText() {
//         btns.forEach(btn => {
//             btn.classList.remove('active-style');
//             btn.nextElementSibling.classList.remove('active-content');
//             btn.nextElementSibling.style.maxHeight = '0px';
//         });
//     };

//     btns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             if (!accordionOpened) {
//                 this.classList.add('active-style');
//                 this.nextElementSibling.classList.add('active-content');
//                 this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
//                 accordionOpened = true;
//             } else {
//                 if (!this.nextElementSibling.classList.contains('active-content')) {
//                     hideText();
//                     this.classList.add('active-style');
//                     this.nextElementSibling.classList.add('active-content');
//                     this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
//                     accordionOpened = true;
//                 } else {
//                     hideText();
//                     accordionOpened = false;
//                 }                
//             }; 
//         });
//     });
// };
// export default accordion;