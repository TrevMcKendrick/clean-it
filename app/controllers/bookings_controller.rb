class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :edit, :update, :destroy]
  before_action :set_prices

  # GET /bookings
  # GET /bookings.json
  def index
    @bookings = Booking.all
  end

  # GET /bookings/1
  # GET /bookings/1.json
  def show
  end

  # GET /bookings/new
  def new
    @booking = Booking.new
  end

  # GET /bookings/1/edit
  def edit
  end

  # POST /bookings
  # POST /bookings.json
  def create
        
    @booking = Booking.new(booking_params)

    @booking.price = @booking.calculate_price(params[:booking][:hours].to_i)
    @booking.save

    jobs = booking_job_params[:job][:extras].split(",")

    jobs << booking_job_params[:job][:bedroom]
    jobs << booking_job_params[:job][:bathroom]
    
    create_booking_job_instances_from_array(jobs, @booking)
    
    @user = @booking.build_user(user_params[:user])

    stripe_user_object = User.create_stripe_user(params[:stripeToken], "blank_description")

    @user.stripe_id = stripe_user_object.id
    @user.password = Devise.friendly_token.first(8)

    @user.save
    
    # send email once mailer is implemented
    # RegistrationMailer.welcome(user, generated_password).deliver

    begin
      charge = Stripe::Charge.create(
        :amount => @booking.price, # amount in cents, again
        :currency => "usd",
        :customer => @user.stripe_id,
      )
    rescue Stripe::CardError => e
      # The card has been declined
    end

    respond_to do |format|
      if @booking.save
        #log in user
        # sign_in(:user, @user)

        format.html { redirect_to new_user_session_url, notice: 'Booking was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end

  # PATCH/PUT /bookings/1
  # PATCH/PUT /bookings/1.json
  def update
    respond_to do |format|
      if @booking.update(booking_params)
        format.html { redirect_to @booking, notice: 'Booking was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bookings/1
  # DELETE /bookings/1.json
  def destroy
    @booking.destroy
    respond_to do |format|
      format.html { redirect_to bookings_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def booking_params
      params.require(:booking).permit(:time, :needs_supplies, :hours, :price)
    end

    def booking_job_params
      params.require(:booking).permit(job: [:bedroom, :bathroom, :extras])
    end

    def user_params
      params.require(:booking).permit(user: [:name, :address, :email, :phone])
    end

    def create_booking_job_instances_from_array(array, booking)
      array.each do |element|
        @booking_job = booking.booking_jobs.create
        job = Job.find_by name: element
        @booking_job.job_id = job.id
        @booking_job.booking_id = booking.id
        @booking_job.save
      end
    end

    def set_prices
      gon.price = HOURLY_PRICE
      gon.supplies_price = SUPPLIES_PRICE
    end

end
