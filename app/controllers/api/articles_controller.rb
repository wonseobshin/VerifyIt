class Api::ArticlesController < ApplicationController
  def index
    articles = Article.all
    render :json => {
      articles: articles
    }
  end

  def create
    @articletest = Article.find_by(url: article_params[:url])
    if !@articletest
      @article = Article.create(article_params)
      puts params[:id]
      if @article.save
        render :json => {
          article_id: @article.id
        }
      else
        head(:internal_server_error)
      end
    else
      render :json => {
        article_id: @articletest.id
      }
    end
  end

  def show
    article = Article.find params[:id]
    rating = Rating.where(:article_id => params[:id]).average(:rating)
    # .average(:rating).round(1)
    fakeboxRating = article.fakeboxRating
    puts fakeboxRating
    puts 'showing one article!'
    puts rating

    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      rating: rating,
      fakebox_rating: article.average_rating,
    }
  end



  private

  def article_params
    params.require(:article).permit(
      :url,
      :title,
      :content,
      :fakeboxRating
    )
  end

end