# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_category, only: :create
  before_action :load_article, only: %i[show]
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

  def show
    puts params
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

    def load_article
      @article = Article.find_by(id: params[:id])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
