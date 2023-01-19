class Shop < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews
  has_many :favorites, through: :users

  validates :id, presence: :true
  validates :name, presence: :true

end
