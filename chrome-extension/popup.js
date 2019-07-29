import rp from "../client/src/lib/scrapers/reutersScraper";
// import Axios from "axios";

function getCurrentTabUrl() {
  console.log("console here!")
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    rp(tabs[0].url, (article) => {
      // console.log(article);
      axios.post("http://localhost:3000/api/articles", article)
      .then(res => {
        // console.log('res:', res);
        // Manually redirecting because redirects for AJAX POST not working
        // window.location.href = res.request.responseURL;

        // changeArticle({id: res.data.article_id});
      })
      .catch(err => console.log("error", err));
    });
  });
}

document.querySelector('#get-url').addEventListener('click', getCurrentTabUrl)

