# frozen_string_literal: true

class Category < ApplicationRecord
  validates :name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  acts_as_list
end
