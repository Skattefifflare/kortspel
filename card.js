class Card {
    
    constructor(index, {name, cardclass, desc, source, atk, hp}){
        this.index = index;
        this.data = {name, cardclass, desc, source, atk, hp};
    }

    create_card_element() {
        const width = 192;

        const card_div = Object.assign(document.createElement("div"), {
            style: Object.assign(document.createElement("div").style, {
                position      : "relative",
                width         : "100%",
                height        : "100%",
                verticalAlign : "text-bottom",
                gridArea      : "1 / 1",
            })
        });
        
        const bg_num = Math.floor(Math.random() * 4 + 1);
        const card_bg = Object.assign(document.createElement("img"), {
            src: `assets/bg${bg_num}.jpg`,
            style: Object.assign((document.createElement("img")).style, {
                width    : "85.7%",
                position : "absolute",
                left     : "7.06%",
                top      : "10.3%",
            })
        });
        card_div.appendChild(card_bg);

        const card_character = Object.assign(document.createElement("img"), {
            src: "assets/kort.png",
            style: Object.assign(document.createElement("img").style, {
                width    : "100%",
                height   : "100%",
                position : "absolute",
                left     : "0px",
                top      : "0px",
            })
        });
        card_div.appendChild(card_character);

        const card_name = Object.assign(document.createElement("p"), {
            innerHTML: `<span style="font-size: 100%;">${this.data.name}</span> <span style="font-size: 70%;">  ${this.data.cardclass}</span>`,
            style: Object.assign(document.createElement("img").style, {
                position : "absolute",
                left     : "8%",
                top      : "53%",
                fontSize : `${width / 18}px`,
                color    : "black",
            })
        });
        card_div.appendChild(card_name);

        const card_desc = Object.assign(document.createElement("p"), {
            innerHTML: this.data.desc,
            style: Object.assign(document.createElement("p").style, {
                position : "absolute",
                left     : "9%",
                top      : "61%",
                fontSize : `${width / 27}px`,
                color    : "black",
                width    : "80%",
            })
        });
        card_div.appendChild(card_desc);

        if (this.data.source != null) {
            const card_source = Object.assign(document.createElement("p"), {
                innerHTML: `-${this.data.source}`,
                style: Object.assign(document.createElement("p").style, {
                    position : "absolute",
                    left     : "10.08%",
                    top      : "80.21%",
                    fontSize : `${width / 34}px`,
                    color    : "black",
                    width    : "80%",
                })
            });
        }
        return card_div;
    }
}

class CardHandler { 
    constructor() {
        this.cards = [];
        wsdfsf();
    }

    async wsdfsf(){
        const response = await fetch('cards.json');
        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const data = await response.json();
        const characters = data.characters;
        
        let i = 0;
        characters.array.forEach(character => {
            this.cards.push(new Card(i, character));
            i++;
        });
    }

}