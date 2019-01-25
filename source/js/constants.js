import {Power1} from "gsap";

export default {
  ID_LENGTH: 24, // ID length for tocbot
  TOCBOT_SETTINGS: {
    // Where to render the table of contents.
    tocSelector: `.departments`,
    // Where to grab the headings to build the table of contents.
    contentSelector: `.employees`,
    // Which headings to grab inside of the contentSelector element.
    headingSelector: `.department`,
    // Main class to add to lists.
    listClass: `departments__list`,
    // Class to add to list items.
    listItemClass: `departments__item`,
    // Smooth scrolling enabled.
    scrollSmooth: true,
    // Class to add to active list items.
    activeListItemClass: `departments__item--active`,
    // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
    headingsOffset: 126,
    // Smooth scroll offset
    scrollSmoothOffset: -126,
  },
  SCROLL_SETTINGS: { // Search scroll settings
    time: 500,
    align: {
      top: 0,
      topOffset: 150
    }
  },
  SEARCH_DELAY: 1000, // Search delay after input in ms
  Animation: { // Popup animation settings
    DURATION: 0.5,
    TRANSPARENT: 0,
    VISIBLE: 1,
    EASING: Power1.easeInOut,
    X_VISIBLE: 0,
    X_HIDDEN: 240,
    SPINNER_CONTENT: `<div class="spinner"><div></div></div>`
  },
  AUTOCROLL_DELAY: 150 // Delay for autoscroll in ms
};
