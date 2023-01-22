class SessionsController < ApplicationController
  def click
    cookies[:click] ||= 0
    cookies[:click] = cookies[:click].to_i + 1
    session[:click] ||= 0
    session[:click] += 1
    render json: { session: session, cookies: cookies.to_hash}
  end

  def create
    user = User.find_by(name: params[:name])
    session[:user_id] = user_id
    render json: user
  end

end
