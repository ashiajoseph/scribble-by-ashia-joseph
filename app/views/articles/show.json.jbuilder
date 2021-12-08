json.article do
  json.extract! @article, :id, :title, :content, :status
  json.category_id @article.category_id ? @article.category_id : ""
  json.category @article.category_id ? @article.category.name : ""
end
