// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// src/js/utils.mjs
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Renders a list of items using a template function.
 *
 * @param {Function} templateFn - Function that returns an HTML string for a single item
 * @param {HTMLElement} parentElement - Element to insert the HTML into
 * @param {Array} list - Array of data objects to render
 * @param {string} [position="afterbegin"] - Where to insert the HTML (default: "afterbegin")
 * @param {boolean} [clear=false] - Whether to clear the parentElement before inserting
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (!parentElement || !list || !templateFn) return;

  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}