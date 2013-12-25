class AddColumnToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :customer_id, :integer
  end
end
