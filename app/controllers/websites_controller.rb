# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website

  def show
  end

  def update
    if @website.update(website_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Website") }
    else
      render status: :unprocessable_entity, json: { error: @website.errors.full_messages.to_sentence }
    end
  end

  private

    def website_params
      params.require(:website).permit(:name, :password)
    end

    def load_website
      @website = Website.first
      unless @website
        render status: :not_found, json: { error: t("not_found", entity: "Website") }
      end
    end
end
