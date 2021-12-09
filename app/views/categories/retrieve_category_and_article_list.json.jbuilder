# frozen_string_literal: true

json.total_draft_count Article.draft.count
json.total_published_count Article.published.count
json.category_list @category_list do |category|
  json.id category.id
  json.name category.name
  json.position category.position
  json.draft category.articles.draft.size
  json.published category.articles.published.size
end

json.article_list_with_categories @category_list do |category|
  json.array! category.articles do |article|
    json.extract! article, :id, :title, :content, :status, :category_id
    json.date article.status === "published" ? article.date.strftime("%B %e, %Y") : "-"
    json.author "Oliver Smith"
    json.category article.category.name
  end
end

json.article_list_without_categories Article.where.missing(:category) do |article|
  json.extract! article, :id, :title, :content, :status, :category_id
  json.date article.status === "published" ? article.date.strftime("%B %e, %Y") : "-"
  json.author "Oliver Smith"
  json.category "-"
end
