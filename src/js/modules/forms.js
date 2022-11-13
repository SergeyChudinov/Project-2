import {postData} from '../services/requsets';

const forms = (state) => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]');
    const textarea = document.querySelectorAll('textarea');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы с вами саяжемся!',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    }

    const path = {
        designer: 'http://localhost:3000/designer',
        question: 'http://localhost:3000/question'
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
            const preview = item.parentNode.parentNode.querySelector('img');
            preview.src = '';
            preview.style.display = 'none';
        })
        document.querySelectorAll('select').forEach(el => {
            el.selectedIndex = 0;
        })
        textarea[0].value = '';
        // state = {};
        // item.files = 
        // console.log(upload.files)
        // upload.forEach(item => {
        //     console.log(item.files)
        //     item.files = {};
        // })
        // console.log(state)
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(item);

            if (item.classList.contains('calc_form')) {
                if (!state.size || !state.material) {
                    return
                }
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }
            if (item.classList.contains('img_form')) {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

            const objFormData = Object.fromEntries(formData.entries());

            // if (objFormData?.upload.name === '') {  // Нужно переписать через ?.
            //     delete  objFormData.upload;
            // }
            if ('upload' in objFormData) { // Нужно переписать через ?. ,Babel не дает
                if(objFormData.upload.name === '') {
                    delete  objFormData.upload;
                }
            }

            const json = JSON.stringify(objFormData);

            postData(api, json)
                .then(data => {
                    statusImg.setAttribute('src', message.ok);
                    // statusImg.src = message.ok;
                    textMessage.textContent = message.success;
                }).catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    // statusImg.src = message.fail;
                    textMessage.textContent = message.failure;
                }).finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                        clearInputs();
                    }, 5000);
                    setTimeout(() => {
                        const windows = document.querySelectorAll('[data-modal]');
                        windows.forEach(item => {
                            item.style.display = 'none';
                        });
                        document.body.style.overflow = '';
                        document.body.style.marginRight = `0px`;
                        if (document.querySelector('.fixed-gift')) {
                            document.querySelector('.fixed-gift').style.marginRight = `0px`;
                        }
                    }, 8000);
                })
        });
    });
};
export default forms;