class Review < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  validates :title, presence: :true
  validates :description, presence: :true
  validates :id, presence: :true
  validate :review_length

  def review_length
    if review.length < 5
        errors.add(:review, "Review is too short.")
    elsif review.length > 250
        errors.add(:review, "Review is too long.")
    end
  end

end
