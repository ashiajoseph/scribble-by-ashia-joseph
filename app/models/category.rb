# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :nullify
  validates :name, presence: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
  acts_as_list
end
