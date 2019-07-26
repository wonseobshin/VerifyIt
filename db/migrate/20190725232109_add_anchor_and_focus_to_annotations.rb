class AddAnchorAndFocusToAnnotations < ActiveRecord::Migration[5.2]
  def change
    add_column :annotations, :anchorId, :string
    add_column :annotations, :focusId, :string
  end
end
