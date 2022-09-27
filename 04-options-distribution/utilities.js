export const getAllOptions = async () => chrome.storage.sync.get({
  booleanOption: false,
  textOption: 'init value'
});

export const handleStorageChange = (changes, namespace) => {
  console.log('storage changed', namespace, changes);
};
