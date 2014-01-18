class UsersController < ApplicationController

  #show method is for the user dashboard. DON'T CONFUSE WITH LOGIN

  before_filter :authenticate_user!

  def show
    @user = User.find(current_user.id)
    @bookings = User.find(@user.id).bookings
  end

end