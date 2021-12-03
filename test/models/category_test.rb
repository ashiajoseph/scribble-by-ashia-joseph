# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = Category.new(name: "Sample")
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_name_should_not_exceed_maximum_length
    @category.name = "a" * 126
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name is too long (maximum is 125 characters)"
  end

  def test_category_obtains_position_on_save
    assert_equal @category.position, nil
    @category.save!
    assert_not_equal @category.position, nil
  end
end
