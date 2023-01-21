class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :average_score

  # attribute :average_score do |object|
  #   (object.average_score.to_f / 100).to_f.round(2)
  # end

  has_many :reviews
  has_many :users
  has_many :favorites
end
