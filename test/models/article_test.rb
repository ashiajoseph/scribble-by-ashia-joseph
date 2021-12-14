# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = build(:article, :draft)
  end

  def test_article_should_be_valid
    assert @article.valid?
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_name_should_not_exceed_maximum_length
    @article.title = "a" * 256
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title is too long (maximum is 255 characters)"
  end

  def test_article_should_not_be_valid_without_content
    @article.content = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Content can't be blank"
  end

  def test_date_added_before_validation
    @article.date = nil
    assert @article.valid?
    assert_equal @article.date, Time.zone.today
  end

  def test_article_can_exist_without_category
    @article.category_id = nil
    assert @article.valid?
  end

  def test_incremental_slug_generation_for_articles
    first_article = Article.create!(
      title: "test article", content: "Lorem Ipsum", category_id: @article.category_id,
      status: "draft")
    second_article = Article.create!(
      title: "test article", content: "Lorem Ipsum", category_id: @article.category_id,
      status: "draft")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    @article.save!
    another_test_article = create(:article, :draft)
    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end
    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("slug_immutable"), error_msg
  end

  def test_updating_article_does_not_update_slug
    @article.save!
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated article title"
      @article.update!(title: updated_article_title)
      assert_equal updated_article_title, @article.title
    end
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(
      title: "security & privacy", content: "Lorem Ipsum",
      category_id: @article.category_id, status: "draft")
    second_article = Article.create!(
      title: "security", content: "Lorem Ipsum", category_id: @article.category_id,
      status: "draft")

    assert_equal "security-privacy", first_article.slug
    assert_equal "security", second_article.slug
  end
end
