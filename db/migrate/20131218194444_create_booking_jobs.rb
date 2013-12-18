class CreateBookingJobs < ActiveRecord::Migration
  def change
    create_table :booking_jobs do |t|
      t.integer :booking_id
      t.integer :job_id

      t.timestamps
    end
  end
end
