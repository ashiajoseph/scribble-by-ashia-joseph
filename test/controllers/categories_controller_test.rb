# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
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
    category2 = create(:category)
    put reorder_position_category_path(@category.id), params: { category: { position: 2 } }
    assert_response :success
    @category.reload
    category2.reload
    assert_equal @category.position, 2
    assert_equal category2.position, 1
  end

  def test_negative_position_updates_category_with_postiton_1
    category2 = create(:category)
    put reorder_position_category_path(category2.id), params: { category: { position: -3 } }
    assert_response :success
    category2.reload
    assert_equal category2.position, 1
  end

  def test_category_and_article_list_retrieved
    create_list(:article, 5, :draft)
    create_list(:article, 5, :published)
    delete category_path(@category.id)
    get retrieve_category_and_article_list_categories_path
    assert_response :success
    assert_equal response.parsed_body["category_list"].size, Category.all.size
    assert_equal response.parsed_body["article_list"].size, Article.all.size
  end

  def test_published_article_list_retrieved
    create_list(:article, 5, :draft)
    create_list(:article, 5, :published)

    get retrieve_published_article_list_categories_path
    assert_response :success
    assert_equal response.parsed_body["list"].size, 5
    article_list = response.parsed_body["list"].map { |category|category["article_list"] }
    assert_equal article_list.flatten(1).size, Article.published.size
  end
end
