class FavoritesController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  wrap_parameters format: []
  def index
    favorites = Favorite.all
    render json: favorites
  end

  def show
    favorite = find_favorite
    render json: favorite, status: :ok
  end

  def create
    favorite = Favorite.create(favorite_params)
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
    params.permit(:drink, :treat, :user_id, :shop_id)
  end

  def render_not_found_response
    render json: { error: "Your Favorites could not be found."}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors }, status: :unprocessable_entity
  end



end
