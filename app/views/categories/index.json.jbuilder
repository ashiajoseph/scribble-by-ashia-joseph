# frozen_string_literal: true

json.total_draft_count Article.draft.count
json.total_published_count Article.published.count
json.category_list @category_list do |category|
  json.id category.id
  json.name category.name
  json.position category.position
  json.article_list category.articles
  json.draft category.articles.draft.size
  json.published category.articles.published.size
end
