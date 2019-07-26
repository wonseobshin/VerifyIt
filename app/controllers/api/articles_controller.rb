class Api::ArticlesController < ApplicationController
  def index
    articles = Article.all
    render :json => {
      articles: articles
    }
  end

  def create
    @article = Article.new(article_params)
  end

  def show
    article = Article.find params[:id]
    rating = Rating.where(:article_id => params[:id]).average(:rating).round(1)
    article.getFakebox
    puts 'showing one article!'
    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      rating: rating
    }
  end



  private

  def article_params
    params.require(:article).permit(
      :url,
      :title,
      :content,
    )
  end

end
