require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get detail" do
    get products_detail_url slug: products(:one).slug
    assert_response :success
  end

  test "should_have_new_average_score" do
    post submit_review_url, params: {
      slug: products(:one).slug,
      score: 4,
      text: 'A test text'
    }
    puts products(:one).reviews.inspect
    assert products(:one).average_score == 2.5
  end
end
