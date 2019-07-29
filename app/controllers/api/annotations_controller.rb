class Api::AnnotationsController < ApplicationController

    def create
        @article = Article.find(params[:article_id])
        @annotation = @article.annotations.create(annotation_params)

        render :json => @annotation.to_json
    end

    def update
        @article = Article.find(params[:article_id])
        @annotation = @article.annotations.find(params[:id]).update(annotation_params)
        render :json => {
            point: annotation_params
        }
    end

    def index
        @article = Article.find(params[:article_id])
        render :json => @article.annotations.to_json
    end
    
    def show
        annotation = Annotation.find params[:id]
        render :json => {
            anchorId:annotation.anchorId,
            focusId:annotation.focusId,
            category:annotation.category,
            point:annotation.point,
            content: annotation.content,
            article_id: annotation.article_id
        }
    end

    private

    def annotation_params
        params.require(:annotation).permit(
            :anchorId,
            :focusId,
            :category,
            :point,
            :content,
            :article_id
        )
    end
end
