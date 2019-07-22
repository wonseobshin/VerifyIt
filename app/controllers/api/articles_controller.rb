class Api::ArticlesController < ApplicationController
  @article = Article.new(article_params)

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
