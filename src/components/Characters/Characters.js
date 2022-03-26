import getDataApi from "../../../utils/axios/GetDataApi";
import { IMG_VARIANTS } from "../../../utils/constants/api";
import { ROOT_MODAL } from "../../../utils/constants/dom";

import "./Characters.css";

class Characters {
  closeHandler() {
    const closeBtn = document.querySelector(".characters__close");
    const characters = document.querySelector(".characters");
    closeBtn.addEventListener("click", () => {
      characters.classList.remove("characters--active");
    });
  }

  async render(id) {
    const response = await getDataApi.getComicsCharacters(id);
    const characters = response.data.data.results;
    if (characters.length) {
      const charactersList = characters.map(
        ({ name, thumbnail: { path, extension } }) => {
          return `
            <li class="characters__item item-characters">
              <h4 class="item-characters__heading">${name}</h4>
              <div class="item-characters__img">
              <img src="${path}/${IMG_VARIANTS.landscape_medium}.${extension}" alt="${name}" />
              </div>
            </li>
          `;
        }
      );
      const html = `
        <section class="characters characters--active">
          <div class="characters__wrapper">
            <span class="characters__close">❌</span>
            <ul class="characters__list">
              ${charactersList.join("\n")}
            </ul>
          </div>
        </section>
      `;

      ROOT_MODAL.innerHTML = html;
      this.closeHandler();
    } else {
      const html = `
      <section class="characters characters--active">
        <div class="characters__wrapper">
          <span class="characters__close">❌</span>
          <h3>Empty characters list</h3>
          <h5>Check another comics</h5>
        </div>
      </section>
    `;
      ROOT_MODAL.innerHTML = html;
      this.closeHandler();
    }
  }
}

export default new Characters();
