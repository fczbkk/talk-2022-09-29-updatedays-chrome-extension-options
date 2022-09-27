export const getAllOptions = async () => chrome.storage.sync.get({
  booleanOption: false,
  textOption: 'init value'
});

export const handleStorageChange = (changes, namespace) => {
  console.log('storage changed', namespace, changes);
};

export const debounce = (fn, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};
