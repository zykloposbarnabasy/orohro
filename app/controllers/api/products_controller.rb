class Api::ProductsController < ApplicationController
  def show
    @product = Product.find_by! slug: params[:slug]
    # render json: @product
  end
end
