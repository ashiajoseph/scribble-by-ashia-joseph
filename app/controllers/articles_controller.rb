# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_category, only: :create
  before_action :load_article, only: %i[show update destroy]
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

  def destroy
    if @article.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @article.errors.full_messages.to_sentence }
    end
  end

  def show
  end

  def update
    if @article.update(article_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Article") }
    else
      render status: :unprocessable_entity, json: { error: @article.errors.full_messages.to_sentence }
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

    def load_article
      @article = Article.find_by(id: params[:id])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end
end
