module ApplicationHelper
  
  def happy_day
    time = Time.new
    message = "Happy" + " " + time.strftime("%A") + "!"
  end

  def mountain_time(time)
    converted_time = time.in_time_zone("Mountain Time (US & Canada)").strftime("%I:%M %p")
    if  converted_time[0] = "0"
      converted_time[1..-1]
    else
      converted_time
    end
  end

  def mountain_date(time)
    time.in_time_zone("Mountain Time (US & Canada)").strftime("%B %e, %Y")
  end

end