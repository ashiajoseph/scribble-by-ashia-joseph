# frozen_string_literal: true

class WebsitesController < ApplicationController
  before_action :load_website

  def show
  end

  private

    def load_website
      @website = Website.first
      unless @website
        render status: :not_found, json: { error: t("not_found", entity: "Website") }
      end
    end
end
