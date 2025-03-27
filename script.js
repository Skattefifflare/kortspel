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

            const bg_num = Math.floor(Math.random() * 4 + 1);
            const card_bg = document.createElement("img");
            card_bg.src = `assets/bg${bg_num}.jpg`;
            card_bg.style.width = "85.7%"; // fixa det här till relativt
            card_bg.style.position = "absolute";
            card_bg.style.left = "7.06%"; // dessa med
            card_bg.style.top = "10.3%";

            card_div.appendChild(card_bg);

            const card_character = document.createElement("img");
            card_character.src = `assets/fighters/${character.name}.png`;
            card_character.style.position = "absolute";
            card_character.style.left = "41.34%";
            card_character.style.top = "19%";
            card_character.style.width = "50.42%";

            card_div.appendChild(card_character);

            const card_frame = document.createElement("img");
            card_frame.src = "assets/kort.png";
            card_frame.style.width = "100%";
            card_frame.style.height = "100%";
            card_frame.style.position = "absolute";
            card_frame.style.left = "0px";
            card_frame.style.top = "0px";
            //card_frame.style.zIndex = 100;

            card_div.appendChild(card_frame);

            const card_name = document.createElement("p");
            card_name.innerHTML = `<span style="font-size: 100%;">${character.name}</span> <span style="font-size: 70%;">  ${character.class}</span>`;
            card_name.style.position = "absolute";
            card_name.style.left = "8%";
            card_name.style.top = "53%";
            card_name.style.fontSize = "32px";
            card_name.style.color = "black";

            card_div.appendChild(card_name);

            const card_desc = document.createElement("p");
            card_desc.innerHTML = character.description;
            card_desc.style.position = "absolute";
            card_desc.style.left = "9%";
            card_desc.style.top = "62%";
            card_desc.style.fontSize = "20px";
            card_desc.style.color = "black";
            card_desc.style.width = "80%";

            card_div.appendChild(card_desc);

            if (character.source != null){
                const card_source = document.createElement("p");
                card_source.innerHTML = `-${character.source}`;
                card_source.style.position = "absolute";
                card_source.style.left = "10.08%";
                card_source.style.top = "77.21%";
                card_source.style.fontSize = "16px";
                card_source.style.color = "black";
                card_source.style.width = "30%";

                card_div.appendChild(card_source);
            }

            document.querySelector(".hand").appendChild(card_div);
        });
    }
    catch (error){
        console.error(error.message)
    }
}


function rotateCards(){
    const hand_cards = document.querySelector(".hand").children();
    const num_of_cards = document.querySelector(".hand").childElementCount();
}
