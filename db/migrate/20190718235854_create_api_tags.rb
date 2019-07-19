class CreateApiTags < ActiveRecord::Migration[5.2]
  def change
    create_table :api_tags do |t|
      t.string :name
      t.integer :article_id

      t.timestamps
    end
  end
end
