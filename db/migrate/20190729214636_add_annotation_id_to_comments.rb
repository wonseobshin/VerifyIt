class AddAnnotationIdToComments < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :annotation_id, :integer
  end
end
