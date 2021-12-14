# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @website = create(:website)
  end

  def test_should_login_user_with_valid_credentials
    post session_path, params: { login: { password: "welcome123" } }
    assert_response :success
    assert_equal response.parsed_body["authentication_token"], @website.authentication_token
  end

  def test_shouldnt_login_user_with_invalid_credentials
    post session_path, params: { login: { password: "welcome" } }

    assert_response :unauthorized
    assert_equal response.parsed_body["error"], t("access_denied")
  end
end
