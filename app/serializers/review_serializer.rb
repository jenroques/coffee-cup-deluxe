class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :score, :shop_id, :user_id

  belongs_to :user
  belongs_to :shop
end
