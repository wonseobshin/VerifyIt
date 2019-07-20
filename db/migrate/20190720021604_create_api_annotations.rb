class CreateApiAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :api_annotations do |t|
      t.string :category
      t.string :content
      t.integer :points
      t.integer :user_id
      t.integer :article_id

      t.timestamps
    end
  end
end
