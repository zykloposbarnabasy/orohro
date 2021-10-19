class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :slug, null: false
      t.string :title
      t.text :description

      t.timestamps
    end

    add_index :products, :slug, unique: true

  end
end
