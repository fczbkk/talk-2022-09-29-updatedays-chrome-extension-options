(async () => {

  // handle interactions with form fields
  const booleanElement = document.querySelector('#booleanOption');
  booleanElement.addEventListener('input', async (event) => {
    await chrome.storage.sync.set({booleanOption: event.target.checked})
  });

  const textElement = document.querySelector('#textOption');
  textElement.addEventListener('input', async (event) => {
    await chrome.storage.sync.set({textOption: event.target.value})
  });

  const getAllOptions = async () => chrome.storage.sync.get({
    booleanOption: false,
    textOption: 'init value'
  });

  // initial content
  const {booleanOption, textOption} = await getAllOptions()
  booleanElement.checked = booleanOption;
  textElement.value = textOption;

})();
