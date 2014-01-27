module UsersHelper

  def user_bookings
    current_user.bookings
  end

  def time(time)
    time.in_time_zone("Mountain Time (US & Canada)").strftime("%I:%M %p")
  end

  def date(time)
    time.in_time_zone("Mountain Time (US & Canada)").strftime("%B %e, %Y")
  end

  def prettify_price(price)
    stringified_price = price.to_s
    length = stringified_price.length
    "$" + stringified_price[0, length-2]
  end

  def jobs(booking)
    array = booking.jobs.collect do |job|
      job.name
    end
    array.join(", ")  
  end

  def current_user_value(attribute)
    current_user[attribute] if user_signed_in?
  end
end
