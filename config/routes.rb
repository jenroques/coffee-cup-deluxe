Rails.application.routes.draw do

  resources :shops, only: [:index, :show]
  resources :reviews, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:create, :update, :destroy]
  resources :favorites, only: [:index, :show, :create, :destroy]
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/auth", to: "users#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
