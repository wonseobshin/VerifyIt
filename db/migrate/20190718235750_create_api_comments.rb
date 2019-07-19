class CreateApiComments < ActiveRecord::Migration[5.2]
  def change
    create_table :api_comments do |t|
      t.string :title
      t.string :content
      t.integer :comment_points
      t.integer :user_id
      t.integer :article_id

      t.timestamps
    end
  end
end
