const url = '/weather?address='
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.getElementById('message-1');
let messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;


    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch(`${url}${location}`).then(response => {
        response.json().then(data => {
            search.value = "";

            if(data.error){
                messageOne.textContent = `${data.error}`
                return
            }
            messageOne.textContent = `${data.location}`;
            messageTwo.textContent = `${data.forecast}`;
        })
    })
})
