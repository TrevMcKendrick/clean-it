class Mailer < ActionMailer::Base
  default from: DEFAULT_MAILER_SENDER
  include ApplicationHelper
  helper :application
  
  def welcome(user, booking)
    @user = user
    @booking = booking
    mail to: @user.email, subject: confirmation_subject_line(@booking.time)
  end

  def new_booking(user, booking)  
    @user = user
    @booking = booking
    mail to: @user.email, subject: confirmation_subject_line(@booking.time)
  end

  def confirmation_subject_line(time)
    "EverHaven Cleaning confirmed for #{mountain_date(@booking.time)} at #{mountain_time(@booking.time)}."
  end

end