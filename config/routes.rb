# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :categories, only: %i[index create]
    resources :categories do
      member do
        put "reorder_position"
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
