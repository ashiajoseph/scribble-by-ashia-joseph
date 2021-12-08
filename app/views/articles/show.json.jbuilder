# frozen_string_literal: true

json.article do
  json.extract! @article, :title, :content, :status
  json.category_id @article.category_id ? @article.category_id.to_s : ""
end
json.category @article.category_id ? @article.category.name : ""
