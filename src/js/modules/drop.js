import {postData} from '../services/requsets';

const drop = (state) => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefault, false);
        });
    });

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation(); // остановим всплытие
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '5px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        // if (item.closest('.calc_form')) {
        //     item.closest('.file_upload').style.backgroundColor = '#fff';
        // } else if (item.closest('form')) {
        //     item.closest('.file_upload').style.backgroundColor = '#ededed';
        // } else {
        //     item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        // }
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,0)';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });
    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onloadend = function () {
                var base64String = reader.result;
                const json = {
                    name: input.files[0].name,
                    data: base64String,
                };
                if (!input.closest('form')) {
                    postData('http://localhost:3000/img', JSON.stringify(json));
                } else {
                    state['upload'] = json.data;
                    state['imgName'] = json.name;
                }               
            };
            
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 7) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            const preview = input.parentNode.parentNode.querySelector('img');
            previewFile(input, preview);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('input', () => {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onloadend = function () {
                var base64String = reader.result;
                const json = {
                    name: input.files[0].name,
                    data: base64String,
                };
                if (!input.closest('form')) {
                    postData('http://localhost:3000/img', JSON.stringify(json));
                } else {
                    state['upload'] = json.data;
                    state['imgName'] = json.name;
                }
                
            };

            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 7) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            const preview = input.parentNode.parentNode.querySelector('img');
            previewFile(input, preview);
        })
    });

    function previewFile(input, preview) {
        var file = input.files[0];
        var reader = new FileReader();

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
        preview.style.display = 'block';
    }
};
export default drop;

// События претаскивания
// drag *
// dregend *
// dragenter - обьект над dropArea
// dragexit *
// dragleave - обьект за пределами dropArea
// dragover - обьект зависает над dropArea
// dragstart *
// drop - обьект отправлен в dropArea

// <input type=file name='upload'  multiple accept="image/*"> 
// multiple- позволяет указывать несколько файлов
// accept="image/*" что загружаем, * разрешает изображение всех тиров