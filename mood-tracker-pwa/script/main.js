/* eslint-disable prettier/prettier */
import { getQuoteOfDay } from '../services/getQuoteOfDay';
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** @constant
    * @type {object}
    * @property {string}  config.BEARER_TOKEN    - The Bearer Token.
    * @property {string}  config.URL_ADDRESS     - The URL to the API.
    @default
*/
const { URL_ADDRESS, BEARER_TOKEN } = config;
/** 
 * calls the function to do a get request when home page load
*/
window.addEventListener('load', (e) => {
  e.preventDefault();
  getQuoteOfDay(URL_ADDRESS, BEARER_TOKEN);
});



