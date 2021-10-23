class ProductsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "product_#{params[:product_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
