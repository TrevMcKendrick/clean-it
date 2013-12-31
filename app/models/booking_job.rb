class BookingJob < ActiveRecord::Base
  belongs_to :job
  belongs_to :booking
end








# get string of extras(jobs)
# put each item from the string into an array (job_array)
# create an instance of Booking_Job for each item in the array
# set the job id of each Booking_Job instance to the corresponding job id
# set the booking id of each Booking_Job instance to the same booking instance