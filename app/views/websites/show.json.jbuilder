# frozen_string_literal: true

json.website do
  json.extract! @website, :name
  json.password_present @website.password_digest ? true : false
end
