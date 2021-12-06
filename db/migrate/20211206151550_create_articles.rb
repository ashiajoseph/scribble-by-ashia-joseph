# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :content, null: false
      t.string :status, null: false
      t.date :date, null: false
      t.references :category, foreign_key: true
      t.timestamps
    end
  end
end
