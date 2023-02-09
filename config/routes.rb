Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create]
  resources :shops, only: [:index, :show, :create, :destroy]
  resources :reviews, only: [:index, :show, :create, :update, :destroy]
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"

  #get "/auth", to: "users#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
