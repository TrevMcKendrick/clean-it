class RemoveColumnFromBooking < ActiveRecord::Migration
  def change
    remove_column :bookings, :customer_id, :string
  end
end
