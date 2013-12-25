class AddColumnsToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :hours, :float
  end
end
