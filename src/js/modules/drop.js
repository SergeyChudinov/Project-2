import {postData} from '../services/requsets';

const drop = () => {
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
            console.log(input.files)
            // const json = JSON.stringify(Object.fromEntries(input.files.entries()));
            // const json =  {
            //     name: "Сергей Чудинов",
            //     phone: "+7 (926) 350 94 62",
            //     id: 1
            //   };
            // postData('http://localhost:3000/img', json)
            //     .then(data => console.log(data));
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 7) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
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