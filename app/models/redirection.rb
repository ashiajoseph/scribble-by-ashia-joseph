# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from, uniqueness: { allow_blank: true }
end
