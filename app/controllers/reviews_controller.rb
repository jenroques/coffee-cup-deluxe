class ReviewsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index]
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record

  wrap_parameters format: []

  def index
    reviews = Review.all
    render json: reviews
  end

  def show
    review = find_review
    render json: review
  end

  def create
    review = Review.create(review_params)
    render json: review, status: :created
  end

  def update
    review = find_review
    review.update(update_review_params)
    render json: review, status: :accepted
  end

  def destroy
    review = find_review
    review
    review.destroy
    head :no_content
  end

  private

  def find_review
    Review.find(params[:id])
  end

  def review_params
    params.permit(:title, :description, :score, :shop_id, :user_id)
  end

  def update_review_params
    params.permit(:title, :description, :score)
  end

  def render_not_found_response
    render json: { error: "Review not found."}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors }, status: :unprocessable_entity
  end


end
