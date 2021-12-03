# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = Category.create!(name: "Sample")
  end

  def test_should_list_all_categories
    get categories_path
    assert_response :success
    assert_equal response.parsed_body["category_list"].size, Category.all.size
  end

  def test_should_create_valid_category
    post categories_path, params: { category: { name: "Second Sample" } }
    assert_response :success
    assert_includes response.parsed_body["notice"], t("successfully_created", entity: "Category")
  end

  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: "" } }
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Name can't be blank"
  end

  def test_should_update_category_name
    new_name = "Trial"
    category_params = { category: { name: new_name } }
    put category_path(@category.id), params: category_params
    assert_response :success
    @category.reload
    assert_includes response.parsed_body["notice"], t("successfully_updated", entity: "Category")
    assert_equal @category.name, new_name
  end

  def test_shouldnt_update_invalid_category_name
    new_name = " "
    category_params = { category: { name: new_name } }
    put category_path(@category.id), params: category_params
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Name can't be blank"
  end

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete category_path(@category.id)
    end
    assert_response :success
    assert_includes response.parsed_body["notice"], t("deleted_successfully")
  end

  def test_shouldnt_load_invalid_category
    invalid_id = 100
    put category_path(invalid_id)
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Category")
  end

  def test_should_update_category_position
    category2 = Category.create!(name: "Sample 2")
    put reorder_position_category_path(@category.id), params: { category: { position: 2 } }
    assert_response :success
    @category.reload
    category2.reload
    assert_equal @category.position, 2
    assert_equal category2.position, 1
  end

  def test_negative_position_updates_category_with_postiton_1
    category2 = Category.create!(name: "Sample 2")
    put reorder_position_category_path(category2.id), params: { category: { position: -3 } }
    assert_response :success
    category2.reload
    assert_equal category2.position, 1
  end
end
