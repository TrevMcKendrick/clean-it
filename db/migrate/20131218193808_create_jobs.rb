class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :name
      t.datetime :time
      t.integer :price

      t.timestamps
    end
  end
end
