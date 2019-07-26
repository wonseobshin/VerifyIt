const rp = require('request-promise');
const $ = require('cheerio');

let include_headers = function(body, response) {
  return {'headers': response.headers, 'data': body}
}
export default (url, cb) => {
  console.log(url)
  // url = '/www.reuters.com/article/us-southkorea-japan-laborers/south-korea-asks-japan-to-cancel-plan-to-remove-the-country-from-white-list-idUSKCN1UJ04F?il=0';
  let options = {
    method: 'GET',
    url: 'https://' + 'cors-anywhere.herokuapp.com/' + url,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
  rp(options)
    .then(function (html) {
      const title = [];
      const author = [];
      const content = [];
          return {
            title: $('h1', html).text(),
            author: $('p.Attribution_content', html).text(),
            content: $('p', html).text(),
          };
        })
    .then(function (article) {
      cb(article);
    })
    .catch(function (err) {
    });
  }
  
