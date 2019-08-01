# VERIFY IT

## INTRODUCTION

- Introduce group
- Talk about motivation
- Introduce verify it and what it aims to provide

## 1

- Go over home page and talk about minimalist design

## 2

- Enter a URL to a fake news story (http://dailyheadlines.com/bombshell-trump-has-just-been-given-the-power-to-send-them-all-back/)
- Once page loads, talk about how the minimalist design makes reading and interacting with the text more accessible and user-friendly
- First two tech features:
  - Web scraper runs as a URL is submitted
   - The scraper operates on our React front-end
   - It uses Cheerio to grab the <h1><h2> headline tags, <p> tags and author attribution tags from an HTML page
   - It also uses a cors-anywhere nodeJS proxy
  - Simultaenously, the app is making an API call to Fakebox
    - Fakebox is an machine-learning tool that analyzes news content and detects fake news
    - It can provide detect bias from a news content with a 95% accuracy
    - We are running it on Docker, alongside our project, which runs on Vagrant

## 3

- Display a new article without any existing highlights or annotations (like shown above^^^)
 - go through a user process
  - emphasize the annotation feature
  - talk about how the annotation code was developed.
- view instructions
- add ratings
  - use this opportunity to talk about material ui as well.

## 4

- Display another article, a real one that will yield a "trusted" fakebox decision
  - make sure this article has existing annotations and comments to view

## 5 

- End with extension?