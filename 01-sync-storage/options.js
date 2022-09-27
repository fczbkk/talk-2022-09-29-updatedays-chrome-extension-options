(async () => {

  // debug tools
  const showStorageContent = async () => {
    console.log('sync storage', chrome.storage.sync);

    const storageContent = await chrome.storage.sync.get();
    console.log('Storage content:')
    console.table(storageContent)
  };
  const debugButton = document.querySelector('#debugButton');
  debugButton.addEventListener('click', showStorageContent);

})();
