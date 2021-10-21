json.extract! @product, :id, :slug, :title, :description, :average_score
json.reviews(@product.reviews) do |review|
  json.extract! review, :id, :score, :text
end
