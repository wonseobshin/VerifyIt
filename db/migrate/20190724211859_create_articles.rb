class CreateArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :articles do |t|
      t.string :url
      t.text :title
      t.text :content
      t.integer :rating

      t.timestamps
    end
  end
end
