# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :category, optional: true
  validates :title, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :content, presence: true
  enum status: { draft: "draft", published: "published" }

  before_validation :set_date

  private

    def set_date
      self.date = Time.zone.today
    end
end
