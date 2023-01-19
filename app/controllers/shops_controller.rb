class ShopsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    shops = Shop.all
    render json: shops, except: [:created_at, :updated_at]
  end

  def show
    shop = Shop.find_by(id: params[:id])
    render json: shop
  end

  private

  def find_shop
    Shop.find(params[:id])
  end

  def render_not_found_response
    render json: { error: "Shop not found."}, status: :not_found
  end

end



