class CreateApiArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :api_articles do |t|
      t.integer :article_points

      t.timestamps
    end
  end
end
