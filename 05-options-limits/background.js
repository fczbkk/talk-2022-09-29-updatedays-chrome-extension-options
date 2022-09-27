import { handleStorageChange } from '../src/utilities.js';

chrome.storage.onChanged.addListener(handleStorageChange);
