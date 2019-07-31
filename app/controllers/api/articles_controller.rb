class Api::ArticlesController < ApplicationController
  def index
    if params[:extension] 
      puts params[:extension]
      @article = Article.find_by(url: params[:extension])
      # if !@articletest

      #   #add the sccrapping thing here

      #   @article = Article.create(#add params here)
      #   puts params[:id]
      #   if @article.save
      #     redirect_to "http://localhost:3000/article/#{@article.id}"
      #   else
      #     head(:internal_server_error)
      #   end
      # else
      # # puts `http://localhost:3000/article/#{@article.id}`
      redirect_to "http://localhost:3000/article/#{@article.id}"

        # render :json => {
        #   article_id: @articletest.id
        # }
      # end
      # return 
    # else
    end
      articles = Article.all
      render :json => {
        articles: articles
      }
    # end
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
    tag = Tag.where(:article_id => params[:id])
    # .average(:rating).round(1)
    fakeboxRating = article.fakeboxRating
    puts fakeboxRating
    fakeboxDecision = article.fakeboxDecision
    puts fakeboxDecision
    fakeboxDomainCategory = article.fakeboxDomainCategory
    puts 'showing one article!'
    puts rating

    render :json => {
      title: article.title,
      url: article.url,
      content: article.content,
      rating: rating,
      tag: tag,
      fakebox_rating: fakeboxRating,
      fakebox_decision: fakeboxDecision,
      fakebox_domain_category: fakeboxDomainCategory 
    }

  end



  private

  def article_params
    params.require(:article).permit(
      :url,
      :title,
      :content,
      :fakebox_rating,
      :fakebox_decision
    )
  end

end