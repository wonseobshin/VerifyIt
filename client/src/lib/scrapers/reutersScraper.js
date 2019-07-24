const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.reuters.com/article/us-southkorea-japan-laborers/south-korea-asks-japan-to-cancel-plan-to-remove-the-country-from-white-list-idUSKCN1UJ04F?il=0';

export default rp(url)
  .then(function (html) {
    //success!
    const title = [];
    const content = [];

    return rp(url)
      .then(function (html) {
        return {
          title: $('h1', html).text(),
          author: $('p.Attribution_content', html).text(),
          content: $('p', html).text(),
        };cd
      })
      .catch(function (err) {
        //handle error
      });
  })
  .then(function (article) {
    console.log(article);
  })
  .catch(function (err) {
    //handle error
  });
