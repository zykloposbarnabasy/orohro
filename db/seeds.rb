products = [
  ['sample-product', 'The Sample Product'],
  ['second-sample-product', 'Sample Product №2']
]

products.each do |slug, title|
  Product.create(slug: slug, title: title)
end


reviews = [
  [1, 5, 'Amazing! This must be one of my favourite products. I am using it all the time. Best buy in a long time.'],
  [1, 3, 'Fair.'],
  [1, 2, 'Wasn\'t really satisfied with it.'],
  [2, 3, 'It\'s okay but it could use some improvements. Usability is lacking in some places. Overall decent product.'],
  [2, 1, 'I regret ever looking at it.'],
  [2, 4, 'Quite good!']
]

reviews.each do |product_id, score, text|
  Review.create(product_id: product_id, score: score, text: text)
end
