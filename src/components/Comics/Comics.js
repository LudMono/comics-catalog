import { END_POINTS, IMG_VARIANTS } from "../../../utils/constants/api";
import getDataApi from "../../../utils/axios/GetDataApi";

import { ROOT_INDEX } from "../../../utils/constants/dom";

import "./Comics.css";

class Comics {
  clickHander() {
    const elements = document.querySelectorAll('.comics__item');
    elements.forEach(el=> {
      el.addEventListener('click', ()=> {
        console.log(el.dataset.id);
      })
    })
  }
  async render() {
    const response = await getDataApi.getData(END_POINTS.comics);
    const comics = response.data.data.results;

    const comicsList = comics.map(
      ({ id, title, thumbnail: { extension, path } }) => {
        if (!path.includes(IMG_VARIANTS.image_not_available)) {
          return `
          <li class="comics__item" data-id="${id}">
            <article class="item-card">
              <h3 class="item-card__heading">${title}</h3>
              <div class="item-card__img">
                <img src="${path}/${IMG_VARIANTS.portrait_incredible}.${extension}" alt="${title}" />
              </div>
            </article>
          </li>
          `;
        }
      }
    );

    const html = `
      <section class="comics">
        <ul class="comics__list">
          ${comicsList.join("\n")}
        </ul>
      </section>
    `;

    ROOT_INDEX.innerHTML = html;
  }
}

export default new Comics();
