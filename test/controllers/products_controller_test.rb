require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get detail" do
    get products_detail_url
    assert_response :success
  end
end
