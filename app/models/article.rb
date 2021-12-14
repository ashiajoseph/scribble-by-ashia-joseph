# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :category, optional: true
  validates :title, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :content, presence: true
  validates :date, presence: true
  validates :slug, uniqueness: true
  validate :slug_not_changed

  enum status: { draft: "draft", published: "published" }

  before_validation :set_date
  before_create :set_slug

  private

    def set_date
      self.date = Time.zone.today
    end

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug = Article.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order(created_at: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("slug_immutable"))
      end
    end
end
