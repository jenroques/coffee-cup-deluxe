class User < ApplicationRecord
  has_many :reviews
  has_many :favorites
  has_many :shops, through: :reviews

  validates :name, presence: :true
  validates :password_digest, presence: :true

end
