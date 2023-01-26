class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  #skip_before_action :authorize, only: :create

  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id]=user.id
    render json: user, status: :created
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:name, :password, :password_confirmation)
  end

  def password_update
    params.permit(:password)
  end

  def render_not_found_response
    render json: { error: "User not found."}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors }, status: :unprocessable_entity
  end

end

