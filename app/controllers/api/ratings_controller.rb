class Api::RatingsController < ApplicationController
  def new
    @rating = Rating.new
  end

  def create
    @article = Article.find(params[:article_id])
    @rating = @article.ratings.create(ratings_params)
    redirect_to api_article_rating_path(@article,@rating)
  end

  def show
    # @rating = Rating.find(params[:id])
    @rating = Rating.average(:rating).round(1)
    render :json => {
      rating: @rating

    }
    puts "show"
  end

  private

  def ratings_params
    params.permit(:rating)
  end
end
