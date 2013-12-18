json.array!(@workers) do |worker|
  json.extract! worker, :id, :name, :address, :email, :phone
  json.url worker_url(worker, format: :json)
end
