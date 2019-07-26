class Api::ArticlesController < ApplicationController
  def index
    articles = Articles.all
    render :json => {
      message: 'hello rails!',
      articles: articles
    }
  end

  def create
    @article = Article.new(article_params)
    redirect_to @article
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