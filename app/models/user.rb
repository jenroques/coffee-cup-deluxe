class User < ApplicationRecord
  has_many :reviews
  has_many :favorites
  has_many :shops, through: :reviews
end
