class AddWorkeridToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :worker_id, :integer
  end
end
