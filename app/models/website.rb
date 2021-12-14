# frozen_string_literal: true

class Website < ApplicationRecord
  has_secure_password :password, validations: false
  has_secure_token :authentication_token

  validates :name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
end
