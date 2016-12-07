Rails.application.routes.draw do
  # Root Route
  root 'boards#index'

  # Devise Routes
  devise_for :users

  # Resource Routes
  resources :boards

  # Custom GET Routes
  # Custom POST Routes
  # Custom PUT Routes
  # Custom DELETE Routes
end
