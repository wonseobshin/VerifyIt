class Api::Article < ApplicationRecord
  has_many :annotations
  has_and_belongs_to_many :tags
  has_many :article_points
end
