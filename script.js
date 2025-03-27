const open_tutorial_btn = document.getElementById('open_tutorial');
const tutorial = document.getElementById('tutorial');
const close_tutorial_btn = document.getElementById('close_button');

open_tutorial_btn.addEventListener('click', () => {
    tutorial.style.display = 'block';
});
close_tutorial_btn.addEventListener('click', () => {
    tutorial.style.display = 'none';
});


async function getData() {
    try {
        const response = await fetch('cards.json');
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const data = await response.json();
        //console.log(data);

        const characters = data.characters;
        characters.forEach(character => {
            const card_div = document.createElement("div");
            card_div.style.position = "relative";
            card_div.style.width = "595px";
            card_div.style.height = "803px";

            const bg_num = Math.floor(Math.random() * 1 + 1);
            const card_bg = document.createElement("img");
            card_bg.src = `assets/bg${bg_num}.jpg`;
            card_bg.style.width = "510px"; // fixa det här till relativt
            card_bg.style.position = "absolute";
            card_bg.style.left = "42px"; // dessa med
            card_bg.style.top = "82px";

            card_div.appendChild(card_bg);

            const card_frame = document.createElement("img");
            card_frame.src = "assets/kort.png";
            card_frame.width = "595px";
            card_frame.height = "803px";
            card_frame.style.position = "absolute";
            card_frame.style.left = 0;
            card_frame.style.top = 0;
            card_frame.style.zIndex = 100;

            card_div.appendChild(card_frame);

            document.body.appendChild(card_div);
        });
    }
    catch (error){
        console.error(error.message)
    }
}

