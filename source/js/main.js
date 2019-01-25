import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import App from "./app";

document.addEventListener(`DOMContentLoaded`, () => {
  const app = new App();
  app.init();
});
