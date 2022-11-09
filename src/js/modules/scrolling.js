// const scrolling = (upSelector) => {   // 1
//     const upElem = document.querySelector(upSelector);
//     let showScroll = false;
//         upElem.classList.add('animated');
//         window.addEventListener('scroll', () => {
//             if (document.documentElement.scrollTop > 1650 && !showScroll) {
//                 showScroll = true;
//                 upElem.classList.add('fadeIn');
//                 upElem.classList.remove('fadeOut');
//             } else if (document.documentElement.scrollTop < 1650 && showScroll) {
//                 showScroll = false;
//                 upElem.classList.add('fadeOut');
//                 upElem.classList.remove('fadeIn');
//             }
//         });

//     const element = document.documentElement;
//     const body = document.body;

//     const calcScroll = (selector) => {
//         const upElems = document.querySelectorAll(selector);
//         upElems.forEach(el => {
//             el.addEventListener('click', function (event) {
//                 let scrollTop = Math.round(element.scrollTop || body.scrollTop); // сколько пролистали
//                 if (this.hash !== '') {
//                     event.preventDefault();
//                     let hashElement = document.querySelector(this.hash); // к чему мы скролим
//                     // let hashElement = document.getElementById(this.hash.substring(1));
//                     let hashElementTop = 0; // сколько пролистать до родителя ХешЭлемента
//                     while (hashElement.offsetParent) { // ближайший родитель или body
//                         hashElementTop += hashElement.offsetTop;// сколько px до верхней гран род элемента
//                         hashElement = hashElement.offsetParent;
//                     }
//                     hashElementTop = Math.round(hashElementTop);
//                     smoothScroll(scrollTop, hashElementTop, this.hash);
//                 }
//             });
//         });
//     };
//     const smoothScroll = (from, to, hash) => {
//         let timeInterval = 1;
//         let prevScrolTop;
//         let speed;

//         if (to > from) {
//             speed = 30;
//         } else {
//             speed = -30;
//         }

//         let move = setInterval(function () {
//             let scrollTop = Math.round(element.scrollTop || body.scrollTop);
//             if (
//                 prevScrolTop === scrollTop ||
//                 (to > from && scrollTop >= to) ||
//                 (to < from && scrollTop <= to)
//             ) {
//                 clearInterval(move);
//                 history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
//             } else {
//                 body.scrollTop += speed;
//                 element.scrollTop += speed; // поднимает на 30px за 1 времяни
//                 prevScrolTop = scrollTop;
//             }
//         }, timeInterval);
//     };
//     calcScroll('.pageup');
//     calcScroll('.header-menu a');
// };
// export default scrolling;


const scrolling = (upSelector) => {   // 2
    const upElem = document.querySelectorAll(upSelector);
    if (upElem[0].classList.contains('pageup')) {
        let showScroll = false;
        upElem[0].classList.add('animated');
        window.addEventListener('scroll', () => {
            if (document.documentElement.scrollTop > 1650 && !showScroll) {
                showScroll = true;
                upElem[0].classList.add('fadeIn');
                upElem[0].classList.remove('fadeOut');
            } else if (document.documentElement.scrollTop < 1650 && showScroll) {
                showScroll = false;
                upElem[0].classList.add('fadeOut');
                upElem[0].classList.remove('fadeIn');
            }
        });
    }

    let links = document.querySelectorAll('[href^="#"]');
    let speed = 0.2;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let elementTop = document.documentElement.scrollTop;
            let bodyTop = document.body.scrollTop;
            let widthTop = Math.round(elementTop || bodyTop); // сколько пролистали
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;  // к чему мы скролим, затем получим верх-ие коор-ы элим относительно экрана
            let start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }
                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));// кол-во пикселей прокутки
                document.documentElement.scrollTo(0, r);

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
};
export default scrolling;