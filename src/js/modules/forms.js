// import checkNumInputs from './checkNumInputs';

const forms = () => {
    const form = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('[name="upload"]');
    
    // checkNumInputs('input[name="user_phone"]');

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

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        // return await res.text();
        return await res.json();
    };
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        })
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.')
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 7) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
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

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            console.log(formData);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(json);

            postData(api, json)
                .then(data => {
                    console.log(data);
                    statusImg.setAttribute('src', message.ok);
                    // statusImg.src = message.ok;
                    textMessage.textContent = message.success;
                }).catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    // statusImg.src = message.fail;
                    textMessage.textContent = message.failure;
                }).finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                    // setTimeout(() => {
                    //     const windows = document.querySelectorAll('[data-modal]');
                    //     windows.forEach(item => {
                    //         item.style.display = 'none';
                    //     });
                    //     document.body.style.overflow = '';
                    // }, 8000);
                })

            // postData('assets/server.php', formData)
            //     .than(res => {
            //         console.log(res);
            //         statusMessage.textContent = message.success;
            //     })
            //     .catch(() => statusMessage.textContent = message.failure)
            //     .finally(() => {
            //         // form.reset();
            //         clearInputs();
            //         setTimeout(() => {
            //             statusMessage.remove();
            //         }, 5000);
            //     });
        });
    });
};
export default forms;