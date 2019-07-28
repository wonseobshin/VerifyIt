class AddFakeboxRating < ActiveRecord::Migration[5.2]
  def change
    add_column :articles, :fakebox_rating, :integer
    add_column :articles, :fakebox_decision, :text
  end
end
