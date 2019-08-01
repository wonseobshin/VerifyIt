
require 'nokogiri'

require "open-uri"

def scraper_rb url
    # url = 'https://www.reuters.com/article/us-usa-election-debate/biden-and-harris-go-on-the-attack-in-democratic-debate-idUSKCN1UQ150'
    puts "you in herer"
    page = Nokogiri::HTML(open(url))
    
    @scraped_title = page.at_css("h1").text
    
    content = page.css("p")

    @scraped_content = ""

    content.each do |paragraph|
        @scraped_content += paragraph.text
    end

    scraped = { "title" => @scraped_title, "content" => @scraped_content}
    puts "This is the raw title: #{@scraped_title}"
    puts "this be content: #{@scraped_content}"

    return scraped
end