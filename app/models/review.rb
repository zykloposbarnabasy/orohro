class Review < ApplicationRecord
  belongs_to :product
  validates :score, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }

  after_create :broadcast_product

  def broadcast_product
    ActionCable.server.broadcast(
      "product_#{product_id}",
      JSON.parse(
        ApplicationController.render(
          template: 'api/products/show',
          locals: { :@product => product }
        )
      )
    )
  end
end
