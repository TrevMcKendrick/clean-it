require 'test_helper'

class MailerTest < ActionMailer::TestCase
  test "successful_signup" do
    mail = Mailer.successful_signup
    assert_equal "Successful signup", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
