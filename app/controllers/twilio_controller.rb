class TwilioController < ApplicationController
protect_from_forgery :except => ["send_text_message"]

  def send_text_message

    # params[:from] 

    @twilio_client = Twilio::REST::Client.new TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN

    @twilio_client.account.sms.messages.create(
      :from => TWILIO_PHONE_NUMBER,
      :to => TREVOR_CELL_PHONE,
      :body => "EverHaven phone call"
    )
     render inline: "<Response><Dial>6262444636</Dial></Response>", content_type: "text/xml"
   end

end
