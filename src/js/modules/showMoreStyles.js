import {getResource} from '../services/requsets';

// 1
// const showMoreStyles = (trigger, styles) => {
//     const cards = document.querySelectorAll(styles);
//     const btn = document.querySelector(trigger);

//     cards.forEach(card => {
//         card.classList.add('animated', 'fadeInUp');
//     });
//     btn.addEventListener('click', () => {
//         cards.forEach(card => {
//             card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
//             card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
//         });
//         btn.remove();
//         // btn.style.display = 'none';
//     });
// };


// 2
// const showMoreStyles = (trigger, styles) => {
//     const cards = document.querySelectorAll(styles);
//     const btn = document.querySelector(trigger);

//     cards.forEach(card => {
//         card.remove();
//     });

//     class Card {
//         constructor(src, title, link, parentSelector) {
//             this.src = src;
//             this.title = title;
//             this.link = link;
//             this.parent = document.querySelector(parentSelector);
//         }
//         render() {
//             const element = document.createElement('div');
//             element.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
//             element.innerHTML = `
//                 <div class=styles-block>
//                     <img src=${this.src} alt=${this.src} >
//                     <h4>=${this.title} </h4>
//                     <a href=${this.link}>Подробнее</a>
//                 </div>
//             `;
//             this.parent.append(element);
//         }
//     }

//     btn.addEventListener('click', () => {
//         getResource('http://localhost:3000/styles')
//             .then(data => {
//                 data.forEach(({src, title, link}) => {
//                     new Card(src, title, link, '#styles .row').render();
//                 });
//             });
//         btn.remove();
//     });
// };


// 3
const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    btn.addEventListener('click', function(){ //удалил стрел функ, чотб работал this
        getResource('http://localhost:3000/styles')
        // getResource('assets/db.json')
            .then(res => {
                // createCards(res.styles);
                createCards(res);
            })
            .catch(error => {
                console.log(error);
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.style.cssText = 'color: red; font-size: 20px; margin: 30px;';
                document.querySelector(wrapper).appendChild(statusMessage);
                statusMessage.textContent = "Сервер не отвечает";
            })
            .finally(() => {
                // btn.remove();
                this.remove();
            })
    });

    function createCards(response) {
        response.forEach(({src, title, link}) => {
            let card = document.createElement('div');
            card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');

            card.innerHTML = `
                <div class=styles-block>
                    <img src=${src} alt=${src} >
                    <h4>=${title} </h4>
                    <a href=${link}>Подробнее</a>
                </div>
            `;
            document.querySelector(wrapper).append(card);
        });
    };
};
export default showMoreStyles;