class CreateApiArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :api_articles do |t|
      t.string :url
      t.string :title
      t.string :content
      t.integer :article_points

      t.timestamps
    end
  end
end
