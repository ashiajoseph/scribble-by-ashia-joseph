# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[update destroy reorder_position]

  def index
    @category_list = Category.order("position ASC")
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: {
        notice: t("successfully_created", entity: "Category"),
        new_category: { id: category.id, name: category.name, position: category.position }
      }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def reorder_position
    if @category.update(position: category_params[:position])
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def retrieve_category_and_article_list
    @category_list = Category.order("position ASC")
    @article_list = Article.includes(:category)
  end

  def update
    if @category.update(name: category_params[:name])
      render status: :ok, json: { notice: t("successfully_updated", entity: "Category") }
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def retrieve_published_article_list
    @category_list = Category.includes(:articles).where(articles: { status: "published" }).order("position ASC")
  end

  private

    def category_params
      params.require(:category).permit(:name, :position)
    end

    def load_category
      @category = Category.find_by(id: params[:id])
      unless @category
        render status: :not_found, json: { error: t("not_found", entity: "Category") }
      end
    end
end
