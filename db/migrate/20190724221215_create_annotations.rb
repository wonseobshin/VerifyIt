class CreateAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :annotations do |t|
      t.string :category
      t.integer :user_id
      t.integer :articles_id
      t.string :content
      t.integer :point

      t.timestamps
    end
  end
end
