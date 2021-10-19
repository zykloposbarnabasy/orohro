class Product < ApplicationRecord
  validates :slug, presence: true
  has_many :reviews

  def average_score
    reviews.average(:score)
  end
end
