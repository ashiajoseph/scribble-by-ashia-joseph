# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @article = create(:article, :draft)
  end

  def test_should_create_valid_article
    post articles_path, params: {
      article:
        {
          title: "General",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "draft"
        },
      category_id: @article.category_id
    }
    assert_response :success
    assert_includes response.parsed_body["notice"], t("successfully_created", entity: "Article")
  end

  def test_shouldnt_create_article_without_title
    post articles_path, params: {
      article:
        {
          title: "",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "draft"
        },
      category_id: @article.category_id
    }
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Title can't be blank"
  end

  def test_shouldnt_create_article_without_content
    post articles_path, params: {
      article:
        {
          title: "General",
          content: "",
          status: "draft"
        },
      category_id: @article.category_id
    }
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Content can't be blank"
  end

  def test_shouldnt_create_article_without_category_id
    post articles_path, params: {
      article:
        {
          title: "General",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          status: "draft"
        },
      category_id: nil
    }
    assert_response :not_found
    assert_includes response.parsed_body["error"], t("not_found", entity: "Category")
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.id)
    end
    assert_response :success
    assert_includes response.parsed_body["notice"], t("deleted_successfully")
  end

  def test_should_update_article_fields
    article_params = {
      article:
        {
          title: "General",
          content: "Lorem Ipsum",
          status: "published"
        },
      category_id: @article.category_id
    }
    put article_path(@article.id), params: article_params
    assert_response :success
    @article.reload
    assert_includes response.parsed_body["notice"], t("successfully_updated", entity: "Article")
    assert_equal @article.title, article_params[:article][:title]
    assert_equal @article.status, article_params[:article][:status]
  end

  def test_shouldnt_update_article_with_invalid_data
    article_params = {
      article:
        {
          title: "General",
          content: "",
          status: ""
        },
      category_id: @article.category_id
    }
    put article_path(@article.id), params: article_params
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Content can't be blank", "Status can't be blank"
  end

  def test_article_can_exist_without_category
    assert_difference "Category.count", -1 do
      delete category_path(@article.category_id)
    end
    assert_response :success
    @article.reload
    assert_nil @article.category_id
  end

  def test_shouldnt_load_invalid_article
    invalid_id = 100
    get article_path(invalid_id)
    assert_response :not_found
    assert_equal response.parsed_body["error"], t("not_found", entity: "Article")
  end
end
