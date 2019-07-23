class Api::Comment < ApplicationRecord
    belongs_to :user
    belongs_to :annotation
end
