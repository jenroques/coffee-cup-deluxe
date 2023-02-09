class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password_digest

  has_many :reviews
  has_many :shops
end

