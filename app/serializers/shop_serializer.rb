class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url

  has_many :reviews
  has_many :users
end
