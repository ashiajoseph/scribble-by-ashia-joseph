# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    resources :categories, only: %i[index create update destroy]
    resources :categories do
      member do
        put "reorder_position"
      end
      collection do
        get "retrieve_category_and_article_list"
        get "retrieve_published_article_list"
      end
    end
    resources :articles, except: %i[index new edit]
    resource :website, only: %i[show update]
    resource :session, only: :create
    resources :redirections, only: %i[create index destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
