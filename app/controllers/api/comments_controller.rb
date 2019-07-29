class Api::CommentsController < ApplicationController

  def index
    puts params
    article = Article.find(params[:article_id])
    annotation = article.annotations.find(params[:annotation_id])
    comment = annotation.comments.all
    render :json => {
      comment: comment
    }
  end

  def create
    @article = Article.find(params[:article_id])
    @annotation = @article.annotations.find(params[:annotation_id])
    @comment = @annotation.comments.create(comment_params)
    render :json => {
      content: @comment.content
    }
  end

  # def show
  #   article = Article.find(params[:id])
  #   annotation = article.annotations.find(params[:annotation_id])
  #   comment = annotation





  # end

  private 
  
  def comment_params
    params.require(:comment).permit(
      :article_id,
      :annotation_id,
      :content
    )

  end

end
