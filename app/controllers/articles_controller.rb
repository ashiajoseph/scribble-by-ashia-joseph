# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_category

  def create
    article = @category.articles.new(article_params)
    if article.save
      render status: :ok, json: {
        notice: t("successfully_created", entity: "Article")
      }
    else
      error = article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :status, :category_id)
    end

    def load_category
      @category = Category.find_by(id: params[:category_id])
      unless @category
        render status: :not_found, json: { error: t("not_found", entity: "Category") }
      end
    end
end
