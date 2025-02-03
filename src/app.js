"use strict";

import { generatePalette, isHexColor } from "./modules/utils.js";
import { Color } from "./modules/color.js";
import * as convert from "color-convert";
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css';

const form = document.querySelector("form");

const handleForm = (e) => {
  try {
    e.preventDefault();

    const valueInput = e.target.firstElementChild.value;

    if (!isHexColor(valueInput)) {
      throw new Error(`${valueInput} n'est pas une couleur hexadécimale`);
    }

    const palette = generatePalette(valueInput);
    displayColor(palette, valueInput);
  } catch (err) {
    console.log("erreur");
    console.error(err);
  }
};

form.addEventListener("submit", handleForm);

const displayColor = (palette, valueInput) => {
  const containerElement = document.querySelector("main");
  containerElement.replaceChildren();

  palette.forEach((el) => {
    const color = new Color([el[0], el[1], el[2]]);
    color.display(containerElement);
  });

  document.querySelector("header").classList.add("minimized");

  document.body.style.background = `linear-gradient(-45deg, #${convert.hsl.hex(
    palette[0]
  )}, #${convert.hsl.hex(palette[4])}, #${convert.hsl.hex(palette[9])})`;
  document.body.style.backgroundSize = `400% 400%`;

  document.documentElement.style.setProperty(
    "--shadow-color",
    `#${convert.hex.hsl(valueInput)[0]}deg`,
    `#${convert.hex.hsl(valueInput)[1]}%`,
    `#${convert.hex.hsl(valueInput)[2]}%`
  );

  containerElement.addEventListener("click", (e) => {

    const notyf = new Notyf();
    const dataColor = e.target;

    if (dataColor.tagName === "DIV" && dataColor.classList.contains("color")) {
      const colorAttribute = dataColor.getAttribute("data-color");
      if(colorAttribute){
        navigator.clipboard.writeText(colorAttribute)
        .then(() => {
          notyf.success("Couleur copiée dans le presse-papiers");
        })
        .catch((err) => {
          notyf.error("Erreur lors de la copie .");
        })
      }
    }
  });
};
