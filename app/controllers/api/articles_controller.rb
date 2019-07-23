class Api::ArticlesController < ApplicationController
  def index
    articles = Articles.all
    render :json => {
      message: 'hello rails!',
      articles: articles
    }
  end

  def create
    article = Article.new(article_params)
  end

  def show
    article = Article.find params[:id]
    puts 'showing one article!'
    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      rating: article.rating
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
