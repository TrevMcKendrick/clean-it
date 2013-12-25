class Job < ActiveRecord::Base

  has_many :booking_jobs
  has_many :bookings, :through => :booking_jobs

  def price_dollars
    self.price / 100
  end

  def price_dollars=(val)
    self.price = val * 100
  end

end
