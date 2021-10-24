class ProductsController < ApplicationController
  def detail
    @product = Product.select(:id, :slug).where(slug: params[:slug]).first!
  end

  def submit_review
    @product = Product.select(:id, :slug).where(slug: params[:slug]).first!
    Review.create(
      product_id: @product.id,
      score: params[:score].to_i,
      text: params[:text]
    )
    redirect_to "/products/#{params[:slug]}"
  end
end
