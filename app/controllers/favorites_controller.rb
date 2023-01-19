class FavoritesController < ApplicationController
  wrap_parameters format: []
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    favorites = Favorite.all
    render json: favorites
  end

  def show
    favorite = find_favorite
    render json: favorite, status: :ok
  end

  def create
    favorite = find_favorite
    render json: favorite, status: :created
  end

  def destroy
    favorite = find_favorite
    favorite.destroy
    head :no_content
  end

  private

  def find_favorite
    Favorite.find(params[:id])
  end

  def favorite_params
    params.permit(:id, :drink, :treat, :user_id, :shop_id)
  end

  def render_not_found_response
    render json: { error: "Your Favorites could not be found."}, status: :not_found
  end


end
