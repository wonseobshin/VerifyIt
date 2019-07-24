require 'net/http'
require 'uri'
require 'httparty'

class Api::Article < ApplicationRecord
  has_many :annotations
  has_and_belongs_to_many :tags

  after_create :getFakebox

  def getFakebox
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    puts response
  end
end

