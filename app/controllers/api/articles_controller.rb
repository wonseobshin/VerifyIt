class Api::ArticlesController < ApplicationController
  def index
    articles = Articles.all
    render :json => {
      message: 'hello rails!',
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
    article.getFakebox
    puts 'showing one article!'
    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      rating: article.rating
    }
  end

  def getRating
  end
  
  def update
    @article = Article.find(params[:id])
    @article.update(article_params)
    render :json => {
      rating: @article.rating
    }
  end

  private

  def article_params
    params.require(:article).permit(
      :url,
      :title,
      :content,
      :rating
    )
  end

end