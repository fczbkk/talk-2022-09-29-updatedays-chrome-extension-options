import { getAllOptions } from './utilities.js';

(async () => {

  const wrapperElement = document.body.appendChild(document.createElement('div'));
  wrapperElement.innerHTML = `
    <div style="position: absolute; top: 0px; left: 0px; padding: 1em; background: yellow; z-index: 10000;">
      <p>Boolean: <span id="booleanElement"></span></p>
      <p>Text: <span id="textElement"></span></p>
    </div>
  `;

  const booleanElement = wrapperElement.querySelector('#booleanElement');
  const textElement = wrapperElement.querySelector('#textElement');

  // listen to changes in options
  chrome.storage.onChanged.addListener((changes) => {
    if ('booleanOption' in changes) {
      booleanElement.innerHTML = changes.booleanOption.newValue;
    }
    if ('textOption' in changes) {
      textElement.innerHTML = changes.textOption.newValue;
    }
  });

  // initial content
  const { booleanOption, textOption } = await getAllOptions();
  booleanElement.innerHTML = booleanOption;
  textElement.innerHTML = textOption;

})();
