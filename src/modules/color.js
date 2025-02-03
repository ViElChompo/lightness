import * as convert from "color-convert";
export class Color {
  #hsl;
  #hex;
  #element;
  constructor(hsl) {
    this.#hsl = hsl;
    this.#hex = `#${convert.hsl.hex(hsl)}`;
    this.#element = this.#generateElement();
  }
  #generateElement() {
    const div = document.createElement("div");
    div.classList.add("color");
    div.dataset.color = this.#hex;
    div.style.backgroundColor = this.#hex;
    const p = document.createElement("p");
    p.textContent = this.#hex;
    p.style.color = this.#hsl[2] < 60 ? "#FFFFFF" : "#000000";
    div.appendChild(p);
    return div;
  };
  display(parentElement){
    
      parentElement.appendChild(this.#element);
    
  };
}