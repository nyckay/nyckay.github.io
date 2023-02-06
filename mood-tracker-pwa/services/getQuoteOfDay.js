/* eslint-disable prettier/prettier */
import { storeSetUp } from '../store/store';
// eslint-disable-next-line new-cap
/**
 * Implementing axios to make a get req for qoute of the day to the API
 * Config property added to implement bearer token into the header in axios fetch call
 */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/prefer-default-export
export async function getQuoteOfDay(url, bearerToken) {
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  // eslint-disable-next-line no-undef
  await axios
    .get(`https://cors-anywhere.herokuapp.com/${url}/qotd`, config)
    .then((res) => {
      // Get current time and assing it to its variable
      // Convert current time to datetime format
      const timeStampVal = Number(new Date());
      const cuurentDate = new Date(timeStampVal).toISOString().split("T")[0];


      // Get date from quoteOfDay and subtract it by one day
      // Convert quote of the day date to numerical format and subtract by 1 since the quoteOfDay is ahead one day
      // Convert numerical to m/day/year
      const quoteDate = storeSetUp.get("quoteOfDay").qotd_date;
      const subtractQuoteDate = new Date(quoteDate);
      const subtrOneDay = subtractQuoteDate.setDate(subtractQuoteDate.getDate() - 1);
      const quoteDateFormat = new Date(subtrOneDay).toISOString().split("T")[0];
      
      
      if (cuurentDate !== quoteDateFormat) {
        storeSetUp.postQuoteOfDay(res.data);
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
}
