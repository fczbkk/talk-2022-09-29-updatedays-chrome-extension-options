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

  // debug tools
  const showStorageContent = async () => {
    const storageContent = await chrome.storage.sync.get();
    console.log('Storage content:')
    console.table(storageContent)
  };
  const debugButton = document.querySelector('#debugButton');
  debugButton.addEventListener('click', showStorageContent);

})();
