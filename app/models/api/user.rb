class Api::User < ApplicationRecord
    has_many :annotations
    has_many :comments
end
