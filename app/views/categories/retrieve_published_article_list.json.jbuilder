# frozen_string_literal: true

json.list @category_list do |category|
  json.extract! category, :id, :name
  json.article_list category.articles do |article|
    json.extract! article, :id, :title, :content, :category_id, :slug
    json.date article.date.strftime("%B %e, %Y")
    json.category article.category.name
  end
end
