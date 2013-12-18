json.array!(@jobs) do |job|
  json.extract! job, :id, :name, :time, :price
  json.url job_url(job, format: :json)
end
