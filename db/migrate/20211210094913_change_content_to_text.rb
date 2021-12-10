# frozen_string_literal: true

class ChangeContentToText < ActiveRecord::Migration[6.1]
  def change
    change_column :articles, :content, :text
  end
end
