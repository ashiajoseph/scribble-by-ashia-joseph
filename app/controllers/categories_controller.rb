# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @category_list = Category.all.order("position ASC")
    puts @category_list
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: { notice: "created" }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
