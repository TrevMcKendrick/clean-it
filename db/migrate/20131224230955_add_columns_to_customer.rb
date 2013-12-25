class AddColumnsToCustomer < ActiveRecord::Migration
  def change
    add_column :customers, :name, :string
    add_column :customers, :address, :string
    add_column :customers, :email, :string
    add_column :customers, :phone, :string
  end
end
