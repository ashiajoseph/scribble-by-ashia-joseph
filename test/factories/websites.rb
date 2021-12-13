# frozen_string_literal: true

FactoryBot.define do
  factory :website do
    name { Faker::Company.name }
    password { "welcome123" }
  end
end
