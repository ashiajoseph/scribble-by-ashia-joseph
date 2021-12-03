# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[reorder_position update]

  def index
    @category_list = Category.all.order("position ASC")
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Category") }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def reorder_position
    if @category.update(position: category_params[:position])
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
  end

  def update
    puts params
    if @category.update(name: category_params[:name])
      render status: :ok, json: {}
    else
      render status: :unprocessable_entity, json: { error: @category.errors.full_messages.to_sentence }
    end
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
