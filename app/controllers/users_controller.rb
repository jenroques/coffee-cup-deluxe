class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  wrap_parameters format: []

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def create
    user = User.create(user_params)
    render json: user, status: :created
  end

  def update
    user = find_user
    user.update(password_update)
    render json: user, status: :accepted
    end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:name, :password_digest)
  end

  def password_update
    params.permit(:password_digest)
  end

  def render_not_found_response
    render json: { error: "User not found."}, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors }, status: :unprocessable_entity
  end

end

