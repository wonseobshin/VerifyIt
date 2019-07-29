

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//   chrome.declarativeContent.onPageChanged.addRules([{
//     conditions: [new chrome.declarativeContent.PageStateMatcher({
//       pageUrl: {schemes: ['https', 'http', 'localhost', 'chrome', 'file']},
//     })
//     ],
// //         actions: [new chrome.declarativeContent.ShowPageAction()]
// //   }]);
// // });

// chrome.contextMenus.create({ 
//   id: 'VerifyItFetcher',
//   title: 'Verify It',
//   contexts: ['all']
// });

// chrome.contextMenus.onClicked.addListener(() => {
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//     rp(tabs[0].url, (article) => {
//       // console.log(article);
//       Axios.post("/api/articles", article)
//       .then(res => {
//         // console.log('res:', res);
//         // Manually redirecting because redirects for AJAX POST not working
//         // window.location.href = res.request.responseURL;

//         // changeArticle({id: res.data.article_id});
//       })
//       .catch(err => console.log("error", err));
//     });
//   });
// });
// chrome.runtime.onStartup.addListener(function (){
//   console.log( chrome.runtime.getURL("/") )
// })

