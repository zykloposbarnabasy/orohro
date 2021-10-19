class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :product, null: false, foreign_key: true
      t.integer :score, null: false
      t.text :text

      t.timestamps
    end
  end
end
