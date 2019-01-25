import generateID from "./generate-id";
import tocbot from "tocbot";
import scrollIntoView from "scroll-into-view";
import {TweenMax} from "gsap/TweenMax";
import fetchData from "./fetch-data";
import constants from "./constants";
const {ID_LENGTH, TOCBOT_SETTINGS, SCROLL_SETTINGS, SEARCH_DELAY, Animation, AUTOCROLL_DELAY} = constants;

export default class App {
  constructor() {
    this._departments = document.querySelectorAll(`.department`);
    this._persons = document.querySelectorAll(`.person`);
    this._tocbotSettings = TOCBOT_SETTINGS;
    this._searchedElement = document.body;
    this._searchDepartmentInput = document.querySelector(`#searchDepartment .search__input`);
    this._searchPersonInput = document.querySelector(`#searchPerson .search__input`);
    this._popup = document.querySelector(`.popup`);
    this._popupOpeners = document.querySelectorAll(`.popup-loader`);
    this._popupCloser = document.querySelector(`.popup-close`);
    this._popupContent = this._popup.querySelector(`.popup__content`);
    this._aside = document.querySelector(`.aside`);
    this._menu = document.querySelector(`.menu`);
    this._body = document.querySelector(`.body--index`);
    this._headerLogo = document.querySelector(`.header .header__logo`);
    this._asideLogo = document.querySelector(`.aside .header__logo`);
  }

  init() {
    this.generateIdentifiers();
    this.initializeTocbot();
    this.initializeSearch();
    this.initializePopup();
    this.initializeAutoscroll();
    this.initializeStickyMenu();
  }

  generateIdentifiers() {
    this._departments.forEach((item) => (item.id = generateID(ID_LENGTH)));
    this._persons.forEach((item) => (item.id = generateID(ID_LENGTH)));
  }

  initializeTocbot() {
    tocbot.init(this._tocbotSettings);
  }

  initializeSearch() {
    const tooltipElement = document.createElement(`ul`);
    tooltipElement.classList.add(`search__tooltip`);
    const departmentTooltipBox = tooltipElement.cloneNode(true);
    const personTooltipBox = tooltipElement.cloneNode(true);
    this._searchDepartmentInput.parentElement.appendChild(departmentTooltipBox);
    this._searchPersonInput.parentElement.appendChild(personTooltipBox);

    /**
     * Scrolls to element and adds class
     * @param {Node} element
     */
    const scrollToFoundElement = (element) => {
      scrollIntoView(element, SCROLL_SETTINGS);
      this._searchedElement.classList.remove(`search--highlight`);
      this._searchedElement = element;
      this._searchedElement.classList.add(`search--highlight`);
    };

    /**
     * Finds given pattern in input and call scrolling if found
     * @param {HTMLInputElement} inputField
     * @param {NodeList} elementsList
     */
    const search = (inputField, elementsList) => {
      const pattern = inputField.value.toLowerCase();
      const tooltipBox = inputField.parentElement.querySelector(`.search__tooltip`);
      const foundMatches = [];
      tooltipBox.innerHTML = ``;

      for (let i = 0; i < elementsList.length; i++) {
        if (!pattern) {
          this._searchedElement.classList.remove(`search--highlight`);
          break;
        }
        const foundMatchIndex = elementsList[i].dataset.text.toLowerCase().indexOf(pattern);
        if (foundMatchIndex !== -1 && foundMatches.length < 10) {
          foundMatches.push(elementsList[i]);
        } else if (foundMatches.length >= 10) {
          break;
        }
      }

      foundMatches.forEach((foundElement) => {
        const tooltipItem = document.createElement(`li`);
        tooltipItem.innerHTML = `<a>${foundElement.dataset.text}</a>`;
        tooltipItem.addEventListener(`click`, (event) => {
          event.preventDefault();
          departmentTooltipBox.innerHTML = ``;
          personTooltipBox.innerHTML = ``;
          scrollToFoundElement(foundElement);
        });
        tooltipBox.appendChild(tooltipItem);
      });
      if (foundMatches[0]) {
        scrollToFoundElement(foundMatches[0]);
      }
    };

    let departmentSearchDelay = null;
    this._searchDepartmentInput.addEventListener(`input`, () => {
      clearTimeout(departmentSearchDelay);
      departmentSearchDelay = setTimeout(() => search(this._searchDepartmentInput, this._departments), SEARCH_DELAY);
    });

    let personSearchDelay = null;
    this._searchPersonInput.addEventListener(`input`, () => {
      clearTimeout(personSearchDelay);
      setTimeout(() => search(this._searchPersonInput, this._persons), SEARCH_DELAY);
    });
  }

  initializePopup() {
    let popupReloaders = this._popup.querySelectorAll(`.popup .popup-load-inside`);

    TweenMax.to(this._popup, Animation.DURATION, {x: Animation.X_HIDDEN, autoAlpha: Animation.TRANSPARENT, ease: Animation.EASING});


    const addEventListenersToReloaders = () => {
      popupReloaders.forEach((element) => {
        element.addEventListener(`click`, (event) => {
          event.preventDefault();
          this._popupContent.innerHTML = Animation.SPINNER_CONTENT;
          fetchData(element.href, (response) => {
            this._popupContent.innerHTML = response.documentElement.innerHTML;
            popupReloaders = this._popup.querySelectorAll(`.popup .popup-load-inside`);
            addEventListenersToReloaders();
          });
        });
      });
    };

    // Open popup
    this._popupOpeners.forEach((element) => {
      element.addEventListener(`click`, (event) => {
        event.preventDefault();
        this._popupContent.innerHTML = Animation.SPINNER_CONTENT;
        fetchData(element.href, (response) => {
          this._popupContent.innerHTML = response.documentElement.innerHTML;
          popupReloaders = this._popup.querySelectorAll(`.popup .popup-load-inside`);
          addEventListenersToReloaders();
          TweenMax.to(this._popup, Animation.DURATION, {x: Animation.X_VISIBLE, autoAlpha: Animation.VISIBLE, ease: Animation.EASING});
        });
      });
    });

    // Close popup
    this._popupCloser.addEventListener(`click`, (event) => {
      event.preventDefault();
      TweenMax.to(this._popup, Animation.DURATION, {x: Animation.X_HIDDEN, autoAlpha: Animation.TRANSPARENT, ease: Animation.EASING});
    });
  }

  initializeAutoscroll() {
    let delay = AUTOCROLL_DELAY;
    const resetDelay = () => (delay = AUTOCROLL_DELAY);

    // Set delay if user manual scrolled or making actions in aside
    this._aside.addEventListener(`mousemove`, resetDelay);
    this._aside.addEventListener(`keydown`, resetDelay);
    this._aside.addEventListener(`wheel`, resetDelay);

    const scrollToActive = () => {
      if (delay > 0) {
        delay -= 1;
      } else {
        const activeItem = this._aside.querySelector(`.departments__item--active`);
        const viewportHeight = document.documentElement.clientHeight;
        if ((activeItem.offsetTop > this._aside.scrollTop + (viewportHeight / 10) * 5) && (this._aside.scrollTop < this._aside.scrollHeight)) {
          this._aside.scrollTop += 3;
        } else if ((activeItem.offsetTop < this._aside.scrollTop + (viewportHeight / 10)) && (this._aside.scrollTop > 0)) {
          this._aside.scrollTop -= 3;
        }
      }
      requestAnimationFrame(scrollToActive);
    };
    requestAnimationFrame(scrollToActive);
  }

  initializeStickyMenu() {
    const stickMenu = () => {
      if (document.documentElement.scrollTop > this._menu.offsetTop) {
        this._menu.classList.add(`menu--fixed`);
        this._body.style.marginTop = `${this._menu.clientHeight}px`;
        this._aside.style.marginTop = `${this._menu.clientHeight}px`;
        this._popup.style.height = `${window.innerHeight - this._menu.clientHeight - 10}px`;
        this._aside.style.height = `${window.innerHeight - this._menu.clientHeight}px`;
        this._headerLogo.classList.remove(`visually-hidden`);
        this._asideLogo.classList.add(`visually-hidden`);
      } else {
        this._menu.classList.remove(`menu--fixed`);
        this._body.style.marginTop = ``;
        this._aside.style.marginTop = ``;
        this._popup.style.height = ``;
        this._aside.style.height = ``;
        this._headerLogo.classList.add(`visually-hidden`);
        this._asideLogo.classList.remove(`visually-hidden`);
      }
      requestAnimationFrame(stickMenu);
    };
    requestAnimationFrame(stickMenu);
  }
}
