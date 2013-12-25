class BookingJob < ActiveRecord::Base
  belongs_to :job
  belongs_to :booking
end
