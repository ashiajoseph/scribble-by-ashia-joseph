# frozen_string_literal: true

json.category_list @category_list do |category|
  json.id category.id
  json.name category.name
  json.position category.position
end
