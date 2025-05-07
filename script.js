
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
        const characters = data.characters;

        index = 0;
        characters.forEach(character => {
            const card = new Card(index, character); 
            document.appendChild(card.create_card_element());
            index++;
            
        });
    }
    catch (error){
        console.error(error.message)
    }
    new_card_spread();
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
function new_card_spread(){
    let hand = [];
    hand = Array.from(document.getElementById("hand").children);

    hand.forEach(card =>  {
            
        gsap.to(card, {
            rotate: 0-hand.indexOf(card) * 14, duration: 0,transformOrigin: "center bottom",   
            x: hand.indexOf(card) * -1, duration:0,
            y: hand.indexOf(card) * 0,//Math.abs(hand.indexOf(card) - ((hand.length/2) - 1)) * -10, duration: 0       
        });
    });
}

function order_z(){
    let hand = [];
    hand = Array.from(document.getElementById("hand").children);


}

function inspect_card(){
    
}



document.addEventListener("DOMContentLoaded", () => {createCards(); bind_tutorial();});