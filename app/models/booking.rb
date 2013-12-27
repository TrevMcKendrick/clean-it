class Booking < ActiveRecord::Base

  belongs_to :worker
  belongs_to :customer
 
  has_many :booking_jobs
  has_many :jobs, :through => :booking_jobs  

end
