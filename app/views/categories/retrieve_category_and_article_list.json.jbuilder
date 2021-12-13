# frozen_string_literal: true

json.total_draft_count Article.draft.count
json.total_published_count Article.published.count
json.category_list Category.all do |category|
  json.id category.id
  json.name category.name
  json.position category.position
  json.draft category.articles.draft.size
  json.published category.articles.published.size
end

json.article_list @article_list do |article|
  json.extract! article, :id, :title, :content, :status, :category_id
  json.date article.status === "published" ? article.date.strftime("%B %e, %Y") : "-"
  json.author "Oliver Smith"
  json.category article.category ? article.category.name : "-"
end

