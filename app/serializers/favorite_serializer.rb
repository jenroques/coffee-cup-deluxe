class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :drink, :treat, :user_id, :shop_id
  belongs_to :user
  belongs_to :shop
end
