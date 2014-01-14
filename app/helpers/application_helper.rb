module ApplicationHelper
  def happy_day
    time = Time.new
    message = "Happy" + " " + time.strftime("%A")
  end
end
