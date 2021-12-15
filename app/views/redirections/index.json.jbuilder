# frozen_string_literal: true

json.redirection_list @redirection_list do |redirection|
  json.extract! redirection, :from, :to
end
