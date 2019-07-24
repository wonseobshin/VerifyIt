class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :tag
      t.integer :articles_id

      t.timestamps
    end
  end
end
