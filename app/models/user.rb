class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :bookings

  def self.create_stripe_user(stripe_token, description)
    customer = Stripe::Customer.create(
        :card => stripe_token,
        :description => description
        )
  end

end
