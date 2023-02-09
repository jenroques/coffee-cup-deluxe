class User < ApplicationRecord
has_secure_password

has_many :reviews
has_many :shops, through: :reviews

validates :name, presence: :true
validates :password_digest, presence: :true

end
