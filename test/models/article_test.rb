# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = create(:article)
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
    @article.title = "a" * 126
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title is too long (maximum is 125 characters)"
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
end
