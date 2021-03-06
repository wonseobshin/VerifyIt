
require 'net/http'
require 'uri'
require 'httparty'

class Article < ApplicationRecord
  has_many :annotations
  has_many :tags
  has_many :ratings

  after_create :fakeboxRating
  def fakeboxRating
    puts "hi i received these: #{title},#{content},#{url}"
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    body = JSON.parse(response.body)
    puts "THIS IS THE BODY OF THE RESPONSE #{body}"
    title_rating = body["title"]["score"] * 100
    content_rating = body["content"]["score"] * 100
    total_rating = title_rating.to_i + content_rating.to_i
    @average_rating = total_rating / 2 
    
  end

  after_create :fakeboxDecision
  def fakeboxDecision
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    body = JSON.parse(response.body) 
    @content_decision = body["content"]["decision"]

  end

  after_create :fakeboxDomainCategory
  def fakeboxDomainCategory
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    body = JSON.parse(response.body)
    @domainCategory = body["domain"]["category"]
  end
end

