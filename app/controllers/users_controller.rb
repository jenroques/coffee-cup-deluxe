class UsersController < ApplicationController
   rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
   rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
   skip_before_action :authorize, only: [:index, :create]

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id]= user.id
    render json: user, status: :created

  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:name, :password, :password_confirmation)
  end

  def render_record_not_found_response
    render json: { error: ["Unauthorized."]}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end

