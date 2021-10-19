class Review < ApplicationRecord
  belongs_to :product
  validates :score, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
end
