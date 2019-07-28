
require 'net/http'
require 'uri'
require 'httparty'

class Article < ApplicationRecord
  has_many :annotations
  has_and_belongs_to_many :tags
  has_many :ratings

  after_create :fakeboxRating

  def fakeboxRating
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    body = JSON.parse(response.body) 
    title_rating = body["title"]["score"] * 100
    content_rating = body["content"]["score"] * 100
    total_rating = title_rating.to_i + content_rating.to_i
    this.average_rating = total_rating / 2


  end
end

