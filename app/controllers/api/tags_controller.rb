class Api::TagsController < ApplicationController

  def index
    @article = Article.find(params[:article_id])
    render :json => @article.tags.to_json
    
  
  end

  def create
    values = tags_params
    puts values.inspect
    @article = Article.find(params[:article_id])
    @tag = @article.tags.create(tags_params)
    
    puts @tag.inspect
    puts @tag.valid?
    render :json => {
      tag: @tag
    }
  end

  def show
    # @rating = Rating.find(params[:id])
    @article = Article.find(params[:article_id])

    @tag = @article.tags
    render :json => {
      tag: @tag
    }
  end

  def destroy
  end

  private

  def tags_params
    params.permit(:tag, :article_id)
  end
end
