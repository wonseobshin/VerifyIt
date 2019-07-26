class Api::AnnotationsController < ApplicationController

    def create
        @article = Article.find(params[:article_id])
        @annotation = @article.annotations.create(annotation_params)
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
