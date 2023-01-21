class Review < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  validates :title, presence: :true
  validates :description, presence: :true

  after_commit -> { shop.calculate_average }

end
