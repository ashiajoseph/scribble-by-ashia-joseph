# frozen_string_literal: true

require "test_helper"

class WebsitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
  end

  def test_should_update_website_name
    new_name = "Spinkart"
    website_params = { website: { name: new_name } }
    put website_path, params: website_params
    assert_response :success
    @website.reload
    assert_equal @website.name, new_name
  end

  def test_shouldnt_update_without_valid_name
    new_name = " "
    website_params = { website: { name: new_name } }
    put website_path, params: website_params
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Name can't be blank"
  end

  def test_should_update_website_password
    website_params = { website: { password: nil } }
    put website_path, params: website_params
    assert_response :success
    @website.reload
    assert_nil @website.password_digest
  end

  def test_shouldnt_update_invalid_password
    website_params = { website: { password: "wel12" } }
    put website_path, params: website_params
    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Password is too short (minimum is 6 characters)"
  end
end
