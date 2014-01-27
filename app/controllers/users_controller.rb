class UsersController < ApplicationController

  #show method is for the user dashboard. DON'T CONFUSE WITH LOGIN

  before_filter :authenticate_user!, only: [:show] 


  def show
    @user = User.find(current_user.id)
    @bookings = User.find(@user.id).bookings
  end

  def check_email_uniqueness
    @user = User.find_by_email(params[:booking][:user][:email])
    
    respond_to do |format|
      format.json { render :json => !@user }
    end
  end

end