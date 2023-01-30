class ShopsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
  skip_before_action :authorize, only: [:index, :create]

  def index
    puts "!!! index"
    shops = Shop.all
    render json: shops
  end

  def show
    shop = find_shop
    render json: shop
  end

  def create
    shop = Shop.create(name: params[:name], image_url: params[:image_url] )
    render json: shop, status: :created
  end


  private

  def find_shop
    Shop.find(params[:id])
  end

  def render_not_found_response
    render json: { error: "Shop not found."}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors }, status: :unprocessable_entity
  end



end



