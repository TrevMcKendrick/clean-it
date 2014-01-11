class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :address, :string
    add_column :users, :phone, :string
    add_column :users, :stripe_id, :string
  end
end
