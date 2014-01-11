class AddColumnToBooking < ActiveRecord::Migration
  def change
    add_column :bookings, :user_id, :string
  end
end
