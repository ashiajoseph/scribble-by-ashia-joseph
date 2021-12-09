# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    category
    title { Faker::Lorem.characters(number: 125) }
    content { Faker::Lorem.paragraph }
    traits_for_enum :status, %w[draft publish]
  end
end
