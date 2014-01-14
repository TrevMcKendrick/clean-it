class Mailer < ActionMailer::Base
  default from: DEFAULT_MAILER_SENDER

  def welcome(user)
    @user = user
    mail to: @user.email, subject: "Welcome to Refresh"
  end

end