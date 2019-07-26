class Api::TagsController < ApplicationController


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
    puts params
  end

  private

  def tags_params
    params.permit(:tag, :article_id)
  end
end
