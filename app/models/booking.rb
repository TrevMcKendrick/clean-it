class Booking < ActiveRecord::Base

  belongs_to :worker
  belongs_to :user
 
  has_many :booking_jobs
  has_many :jobs, :through => :booking_jobs  

  def calculate_price(hours)
    price = hours * HOURLY_PRICE + SUPPLIES_PRICE
    convert_price_to_stripe(price)
  end

  def convert_price_to_stripe(price)
    price * 100
  end

end
