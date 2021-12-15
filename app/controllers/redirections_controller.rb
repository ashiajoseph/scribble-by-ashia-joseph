# frozen_string_literal: true

class RedirectionsController < ApplicationController
  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save
      render status: :ok, json: {
        notice: t("successfully_created", entity: "Redirection")
      }
    else
      error = redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end
end
