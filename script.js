
function bind_tutorial(){
    const open_tutorial_btn = document.getElementById('open_tutorial');
    const tutorial = document.getElementById('tutorial');
    const close_tutorial_btn = document.getElementById('close_button');

    open_tutorial_btn.addEventListener('click', () => {
        tutorial.style.display = 'block';
    });
    close_tutorial_btn.addEventListener('click', () => {
        tutorial.style.display = 'none';
    });
}


async function createCards() {
    try {
        const response = await fetch('cards.json');
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const data = await response.json();
        //console.log(data);

        const characters = data.characters;

        index = 0;
        characters.forEach(character => {
            const card_div = document.createElement("div");
            card_div.style.position = "absolute";
            card_div.style.width = "100%";
            card_div.style.height = "100%";
            card_div.style.verticalAlign = "text-bottom";

            document.querySelector(".draw_stack").appendChild(card_div);
            const width = parseFloat(window.getComputedStyle(card_div).width);

            const bg_num = Math.floor(Math.random() * 4 + 1);
            const card_bg = document.createElement("img");
            card_bg.src = `assets/bg${bg_num}.jpg`;
            card_bg.style.width = "85.7%"; 
            card_bg.style.position = "absolute";
            card_bg.style.left = "7.06%"; 
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
            card_name.style.fontSize = `${width / 18}px`;
            card_name.style.color = "black";

            card_div.appendChild(card_name);

            const card_desc = document.createElement("p");
            card_desc.innerHTML = character.description;
            card_desc.style.position = "absolute";
            card_desc.style.left = "9%";
            card_desc.style.top = "61%";
            card_desc.style.fontSize = `${width / 27}px`;
            card_desc.style.color = "black";
            card_desc.style.width = "80%";

            card_div.appendChild(card_desc);

            if (character.source != null){
                const card_source = document.createElement("p");
                card_source.innerHTML = `-${character.source}`;
                card_source.style.position = "absolute";
                card_source.style.left = "10.08%";
                card_source.style.top = "80.21%";
                card_source.style.fontSize = `${width / 34}px`;
                card_source.style.color = "black";
                card_source.style.width = "80%";

                card_div.appendChild(card_source);
            }
            card_div.id = index;
            index++;
            card_div.addEventListener("click", () => {rotate(card_div);})
        });
    }
    catch (error){
        console.error(error.message)
    }
}

function rotate(id){
    console.log(id);
    gsap.to(id, {
        rotate: 360, 
        duration: .8,
        onComplete: () => {
            gsap.to(id, {duration: 1, x: 1500});
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {createCards(); bind_tutorial(); rotate_hand();});

function rotate_hand(){
    const min_angle = -40;
    const max_angle = 40;
    const tot_angle = Math.abs(min_angle + max_angle);
    const is_even = (document.getElementById("draw_stack").childElementCount % 2 == 0) ? true : false;
    let draw_stack = [];    
    draw_stack = Array.from(document.getElementById("draw_stack").children);
    const card_num = draw_stack.length;
    
    const add_angle = tot_angle / (card_num-1);
    
    const current_angle = min_angle;
    if (is_even)  {
        const i = 0;
        draw_stack.forEach(card => {
            let past_half = (i >= card_num / 2) ? true : false; 
            gsap.to(card, {
                rotate: add_angle * i + (past_half ? add_angle : 0),
                x: i * 100,
            })
            i++;
        });
    }
    else {
        const i = 0;
        draw_stack.forEach(card => {
            gsap.to(card, {
                rotate: add_angle * i,
                x: i * 100,
            });
        });
    }
}
