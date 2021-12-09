# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    category
    title { Faker::Lorem.characters(number: 125) }
    content { Faker::Lorem.paragraph }
    status { "draft" }
  end
end
