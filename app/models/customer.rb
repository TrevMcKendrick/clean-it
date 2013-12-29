class Customer < ActiveRecord::Base

  has_many :bookings

  def self.create_stripe_customer(stripe_token, description)
    customer = Stripe::Customer.create(
        :card => stripe_token,
        :description => description
        )
  end

end
