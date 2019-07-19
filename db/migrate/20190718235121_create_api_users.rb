class CreateApiUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :api_users do |t|
      t.string :email
      t.string :username
      t.string :password
      t.integer :user_points

      t.timestamps
    end
  end
end
