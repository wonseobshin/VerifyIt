require 'net/http'
require 'uri'
require 'httparty'

class Api::Article < ApplicationRecord
  has_many :annotations
  has_and_belongs_to_many :tags

  validate :getFakebox
  def getFakebox
    puts "HEYYYYY"
    uri = URI.parse("http://192.168.88.61:8080/fakebox/check")
    response = HTTParty.post("http://192.168.88.61:8080/fakebox/check", body: { 
      "title": "Cop Hired For Posting Racist Rant On Social Media", 
      "content": "PHOENIX—In response to comments they described as “disgusting,” “cruel,” and “a perfect fit for our organization,” Phoenix law enforcement officials confirmed Tuesday local man Rod Cleighborn had been hired as a cop for posting a racist rant on social media. “Our newly hired officer made comments on Facebook that celebrate police brutality, degrade minorities, and disparage immigrants, indicating his values are very much in line with this department’s,” said Phoenix police spokesperson Sgt. Tommy Thompson, adding that racist language and calls for violence against civilians will always have a place on the force. “Rest assured that as soon as we were informed of his hateful and deeply bigoted remarks, we took quick and decisive action to ensure he was offered a job. Acts of racism such as these will not go unrewarded.” At press time, the Phoenix Police Department announced it had no choice but to promote Cleighborn after the rookie officer had shot an unarmed black child.",
      "url": "https://www.theonion.com/cop-hired-for-posting-racist-rant-on-social-media-1836634142" 
    })
    puts response
  end
end

