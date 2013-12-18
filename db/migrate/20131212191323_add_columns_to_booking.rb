class AddColumnsToBooking < ActiveRecord::Migration
  def change
    add_column :bookings, :time, :datetime
    add_column :bookings, :needs_supplies, :boolean
  end
end
