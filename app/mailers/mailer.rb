class Mailer < ActionMailer::Base
  default from: DEFAULT_MAILER_SENDER

  def welcome(user)
    @user = user
    mail to: @user.email, subject: "Welcome to EverHaven"
  end

  def new_booking(user)
    @user = user
    mail to: @user.email, subject: "Your cleaning is booked!"
  end

end