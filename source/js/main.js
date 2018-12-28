import '@babel/polyfill';
import tocbot from 'tocbot';
import scrollIntoView from 'scroll-into-view';
import generateID from './generate-id';
import fetchData from "./fetch-data";
import {TweenMax, Power1} from "gsap/TweenMax";

document.addEventListener(`DOMContentLoaded`, () => {

  /**
   *   Generate IDs
   */
  const headings = document.querySelectorAll(`.department`);
  const persons = document.querySelectorAll(`.person`);

  headings.forEach((item) => item.setAttribute(`id`, generateID(24)));
  persons.forEach((item) => item.setAttribute(`id`, generateID(24)));

  /**
   *   Init tocbot
   */
  tocbot.init({
    // Where to render the table of contents.
    tocSelector: `.departments`,
    // Where to grab the headings to build the table of contents.
    contentSelector: `.employees`,
    // Which headings to grab inside of the contentSelector element.
    headingSelector: `h3`,
    // Main class to add to lists.
    listClass: `departments__list`,
    // Class to add to list items.
    listItemClass: `departments__item`,
    // Smooth scrolling enabled.
    scrollSmooth: true,
    // Class to add to active list items.
    activeListItemClass: `departments__item--active`,
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset: 120,
  });

  /**
   * Init search
   */

  const removeClassFromNodes = (elementsArray, removedClass) => {
    for (let i = 0; i < elementsArray.length; i++) {
      elementsArray[i].classList.remove(removedClass);
    }
  };

  const searchScroll = (element) => {
    scrollIntoView(element, {
      time: 500,
      align: {
        top: 0,
        topOffset: 150
      },
    });
    removeClassFromNodes(document.querySelectorAll(`.search-highlight`), `search-highlight`);
    element.classList.add(`search-highlight`);
  };

  const search = (searchFormID, searchClass) => {
    const name = document.getElementById(searchFormID).querySelector(`.search__input`).value;
    const pattern = name.toLowerCase();
    const searched = document.getElementsByClassName(searchClass);

    let targetId = ``;
    for (let i = 0; i < searched.length; i++) {
      const index = searched[i].innerHTML.toLowerCase().indexOf(pattern);
      if (!name) {
        removeClassFromNodes(document.querySelectorAll(`.search-highlight`), `search-highlight`);
      }
      if (index !== -1 && name) {
        targetId = `#` + searched[i].id;
        searchScroll(document.querySelector(targetId));
        break;
      }
    }
  };

  document.querySelector(`#searchDepartment .search__input`).addEventListener(`input`, () => {
    search(`searchDepartment`, `department`);
  });

  document.querySelector(`#searchPerson .search__input`).addEventListener(`input`, () => {
    search(`searchPerson`, `person`);
  });

  /**
   * Popup
   */

  const popup = document.querySelector(`.popup`);
  const popupOpener = document.querySelectorAll(`.popup-loader`);
  const popupCloser = document.querySelector(`.popup-close`);
  const popupContent = popup.querySelector(`.popup__content`);
  let popupReloaders = popup.querySelectorAll(`.popup .popup-load-inside`);

  TweenMax.to(popup, 0.5, {x: 240, autoAlpha: 0, ease: Power1.easeInOut});


  const addEventListenersToReloaders = () => {
    popupReloaders.forEach((element) => {
      element.addEventListener(`click`, (event) => {
        event.preventDefault();
        fetchData(element.href, (response) => {
          popupContent.innerHTML = response.documentElement.innerHTML;
          popupReloaders = popup.querySelectorAll(`.popup .popup-load-inside`);
          addEventListenersToReloaders();
        });
      });
    });
  };

  // Open popup
  popupOpener.forEach((element) => {
    element.addEventListener(`click`, (event) => {
      event.preventDefault();
      fetchData(element.href, (response) => {
        popupContent.innerHTML = response.documentElement.innerHTML;
        popupReloaders = popup.querySelectorAll(`.popup .popup-load-inside`);
        addEventListenersToReloaders();
        TweenMax.to(popup, 0.5, {x: 0, autoAlpha: 1, ease: Power1.easeInOut});
      });
    });
  });

  // Close popup
  popupCloser.addEventListener(`click`, (event) => {
    event.preventDefault();
    TweenMax.to(popup, 0.5, {x: 240, autoAlpha: 0, ease: Power1.easeInOut});
  });


  /**
   * Autoscroll
   */

  let delay = 150;
  const resetDelay = () => (delay = 150);
  const aside = document.querySelector(`.aside`);

  // Set delay if user manual scrolled or making actions in aside
  document.querySelector(`.aside`).addEventListener(`mousemove`, resetDelay);
  document.querySelector(`.aside`).addEventListener(`keydown`, resetDelay);
  document.querySelector(`.aside`).addEventListener(`wheel`, resetDelay);

  const scrollToActive = () => {
    if (delay > 0) {
      delay -= 1;
    } else {
      const activeItem = document.querySelector(`.departments__item--active`);
      const viewportHeight = document.documentElement.clientHeight;
      if ((activeItem.offsetTop > aside.scrollTop + (viewportHeight / 10) * 5) && (aside.scrollTop < aside.scrollHeight)) {
        aside.scrollTop += 3;
      } else if ((activeItem.offsetTop < aside.scrollTop + (viewportHeight / 10) * 1) && (aside.scrollTop > 0)) {
        aside.scrollTop -= 3;
      }
    }
    requestAnimationFrame(scrollToActive);
  };
  requestAnimationFrame(scrollToActive);

  /**
   * Sticky menu
   */

  const menu = document.querySelector(`.menu`);
  const bodyStick = document.querySelector(`.body--index`);
  const asideStick = aside;
  const popupStick = document.querySelector(`.popup`);
  const headerLogo = document.querySelector(`.header .header__logo`);
  const asideLogo = document.querySelector(`.aside .header__logo`);

  const stickMenu = () => {
    if (document.documentElement.scrollTop > menu.offsetTop) {
      menu.classList.add(`menu--fixed`);
      bodyStick.style.marginTop = menu.scrollHeight + `px`;
      asideStick.style.marginTop = menu.scrollHeight + `px`;
      popupStick.style.height = window.innerHeight - menu.scrollHeight - 10 + `px`;
      asideStick.style.height = window.innerHeight - menu.scrollHeight + `px`;
      headerLogo.classList.remove(`visually-hidden`);
      asideLogo.classList.add(`visually-hidden`);
    } else {
      menu.classList.remove(`menu--fixed`);
      bodyStick.style.marginTop = ``;
      asideStick.style.marginTop = ``;
      popupStick.style.height = ``;
      asideStick.style.height = ``;
      headerLogo.classList.add(`visually-hidden`);
      asideLogo.classList.remove(`visually-hidden`);
    }
    requestAnimationFrame(stickMenu);
  };
  requestAnimationFrame(stickMenu);
});


