import { cloneElement } from 'react';

const rp = require('request-promise');
const $ = require('cheerio');

let include_headers = function(body, response) {
  return {'headers': response.headers, 'data': body}
}
export default (url, cb) => {
  console.log(url)
  // url = '';
  let options = {
    method: 'GET',
    url: 'https://' + 'cors-anywhere.herokuapp.com/' + url,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
  rp(options)
    .then(function (html) {
      // const title = [];
      // const author = [];
      // const content = [];
      let content = "";
      $('p', html).each(function (index, value) {
        content += $(this).text() + '\n';
      })
      console.log(content)
      return {
        title: $('h1', html).text(),
        author: $('p.Attribution_content', html).text(),
        content: content,
        url: url
      };
    }).then(function (article) {
      cb(article);
    }).catch(function (err) {
      console.log(err)
    });
  }
  
