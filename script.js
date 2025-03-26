const open_tutorial_btn = document.getElementById('open_tutorial');
const tutorial = document.getElementById('tutorial');
const close_tutorial_btn = document.getElementById('close_button');

open_tutorial_btn.addEventListener('click', () => {
    tutorial.style.display = 'block';
});

close_tutorial_btn.addEventListener('click', () => {
    tutorial.style.display = 'none';
});
 
let cards = [];

fetch('cards.json').then(data => {console.log(data) }).catch(error => console.error("error med jsonladdning"));