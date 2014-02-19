CleanIt::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.

  # config.assets.prefix = "/dev-assets"

  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true
  config.assets.js_compressor = :uglifier
  config.assets.compress = false

  config.action_mailer.default_url_options = { :host => 'localhost:3000' }

  ActionMailer::Base.smtp_settings = {
    :address              => "smtp.mailgun.org",
    :port                 => 587,
    :domain               => "sandbox2071.mailgun.org",
    :user_name            => "postmaster@sandbox2071.mailgun.org",
    :password             => "3stmf2chc6h4",
    :authentication       => "plain",
    :enable_starttls_auto => true
  }

end
