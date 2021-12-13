# frozen_string_literal: true

require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  def setup
    @website = build(:website)
  end

  def test_website_should_be_valid
    assert @website.valid?
  end

  def test_website_should_not_be_valid_without_name
    @website.name = ""
    assert_not @website.valid?
    assert_includes @website.errors.full_messages, "Name can't be blank"
  end

  def test_website_name_should_not_exceed_maximum_length
    @website.name = "a" * 256
    assert_not @website.valid?
    assert_includes @website.errors.full_messages, "Name is too long (maximum is 255 characters)"
  end

  def test_password_can_be_nil
    @website.password = nil
    assert @website.valid?
  end

  def test_password_should_have_minimum_length
    @website.password = "welco"
    assert_not @website.valid?
    assert_includes @website.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end
end
