class Api::TagsController < ApplicationController

  def index
    tags = Tag.all
    render :json => {
      tags: tags
    }
    puts tags
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

  private

  def tags_params
    params.permit(:tag, :article_id)
  end
end
