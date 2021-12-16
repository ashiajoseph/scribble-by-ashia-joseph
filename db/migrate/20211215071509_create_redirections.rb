# frozen_string_literal: true

class CreateRedirections < ActiveRecord::Migration[6.1]
  def change
    create_table :redirections do |t|
      t.string :from, index: { unique: true }
      t.string :to
      t.timestamps
    end
  end
end
