# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @website = Website.first
    unless @website.present? && @website.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: t("access_denied") }
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
