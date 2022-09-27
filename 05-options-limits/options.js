import { getAllOptions, debounce } from './utilities.js';

(async () => {

  const statusElement = document.querySelector('#status');

  // keeping info about current payload
  let payload = {};
  const updatePayload = (key, val) => {
    payload[key] = val;
    statusElement.innerHTML = 'Unsaved changes.';
    saveChanges();
  };

  // save changed options to storage
  const saveChanges = debounce(async () => {
    statusElement.innerHTML = 'Saving changes...';
    const payloadCopy = { ...payload };
    console.log('Payload:')
    console.table(payloadCopy)
    payload = {};
    await chrome.storage.sync.set(payloadCopy);
    statusElement.innerHTML = 'All changes saved.';
  }, 1000);

  // handle interactions with form fields
  const booleanElement = document.querySelector('#booleanOption');
  booleanElement.addEventListener('input', async (event) => {
    updatePayload('booleanOption', event.target.checked);
  });

  const textElement = document.querySelector('#textOption');
  textElement.addEventListener('input', async (event) => {
    updatePayload('textOption', event.target.value);
  });

  // initial content
  const {booleanOption, textOption} = await getAllOptions()
  booleanElement.checked = booleanOption;
  textElement.value = textOption;

})();
