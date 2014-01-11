class Job < ActiveRecord::Base

  has_many :booking_jobs
  has_many :bookings, :through => :booking_jobs

end
