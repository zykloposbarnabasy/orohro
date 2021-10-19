class ProductsController < ApplicationController
  def detail
    @product = Product.find_by! slug: params[:slug]
  end

  def submit_review
    @product = Product.find_by! slug: params[:slug]
    Review.create(
      product: @product,
      score: params[:score].to_i,
      text: params[:text]
    )
    redirect_to "/products/#{params[:slug]}"
  end
end
