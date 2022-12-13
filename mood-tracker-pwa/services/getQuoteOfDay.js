/* eslint-disable prettier/prettier */
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
    .get(`${url}/qotd`, config)
    .then((res) => {
      // storeSetUp.retrieveMovieInfo(res.data);
      // storeSetUp.groupMovie(res.data);

      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
