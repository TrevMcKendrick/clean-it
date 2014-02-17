if Rails.env.development? or Rails.env.test?
  Stripe.api_key = "sk_test_41u0zAKbiWmTVhvHcS6gAjp9"
  STRIPE_PUBLIC_KEY = "pk_test_D8QJoVNlDzFFBB3Mx5xC449q"
elsif Rails.env.production?
  Stripe.api_key = "sk_live_VhYCleaZwuUBGSFYFc7WUboz"
  STRIPE_PUBLIC_KEY= "pk_live_8sCPFZoLtW5pXuVHGrRKrROs"
end

HOURLY_PRICE = 29
SUPPLIES_PRICE = 5

DEFAULT_MAILER_SENDER = "hello@EverHavenhq.com"

GOOGLE_ANALYTICS_TRACKING_ID = "UA-47264736-1"
DOMAIN_NAME = "EverHavenhq.com"

PHONE_NUMBER ="(801) 683-2454"

EMAIL_VALIDATION_REGEX = '\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b'