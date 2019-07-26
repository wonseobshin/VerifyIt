class Api::RatingsController < ApplicationController
  def new
    @rating = Rating.new
  end

  def create
    @article = Article.find(params[:article_id])
    @rating = @article.ratings.create(ratings_params)
    @avg_rating = Rating.where(:article_id => params[:article_id]).average(:rating).round(1)
    render :json => {
      rating: @avg_rating

    }
    puts params
  end

  def show
    # @rating = Rating.find(params[:id])
    @article = Article.find(params[:article_id])

    @rating = @article.ratings.average(:rating).round(1)
    render :json => {
      rating: @rating

    }
 
  end

  private

  def ratings_params
    params.permit(:rating)
  end
end
