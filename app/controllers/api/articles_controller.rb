class Api::ArticlesController < ApplicationController
  def index
    puts 'ON RAILS!'
    articles = Api::Articles.all
    render :json => {
      message: 'hello rails!',
      articles: articles
    }
  end

  def create
    article = Api::Article.create(article_params)
  end

  def show
    article = Api::Article.find params[:id]
    article.getFakebox
    puts 'showing one article!'
    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      points: article.article_points
    }
  end

  private

  def article_params
    params.require(:article).permit(
      :url,
      :title,
      :content,
      :article_points
    )
  end
end
