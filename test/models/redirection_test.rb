# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = Redirection.new(from: "/welcome", to: "/")
  end

  def test_redirection_should_be_valid
    assert @redirection.valid?
  end

  def test_from_should_be_unique
    @redirection.save!
    second_redirection = Redirection.new(from: "/welcome", to: "/")
    assert_not second_redirection.valid?
    assert_includes second_redirection.errors.full_messages, "From has already been taken"
  end

  def test_from_can_be_blank
    @redirection.from = ""
    assert @redirection.valid?
  end
end
