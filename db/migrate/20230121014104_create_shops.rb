class CreateShops < ActiveRecord::Migration[6.1]
  def change
    create_table :shops do |t|
      t.string :name
      t.string :image_url
      t.integer :average_score

      t.timestamps
    end
  end
end
