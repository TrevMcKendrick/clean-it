class Booking < ActiveRecord::Base

  belongs_to :worker
  has_many :jobs, :through => :booking_jobs

end
