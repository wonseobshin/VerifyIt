class Api::AnnotationsController < ApplicationController

    def create
        @article = Article.find(params[:article_id])
        @annotation = @article.annotations.create(annotation_params)

        render :json => @annotation.to_json
    end

    def index
        @article = Article.find(params[:article_id])
        render :json => @article.annotations.to_json
    end
    
    private

    def annotation_params
        params.require(:annotation).permit(
            :anchorId,
            :focusId,
            :category,
            :points,
            :content,
            :article_id
        )
    end
end
