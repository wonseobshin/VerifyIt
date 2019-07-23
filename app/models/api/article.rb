require 'net/http'
require 'uri'
require 'httparty'

class Api::Article < ApplicationRecord

  def getFakebox

    uri = URI.parse("http://192.168.88.61:8080/fakebox/check")

    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": title, 
      "content": content,
      "url": url 
    })
    puts response
  end
end
