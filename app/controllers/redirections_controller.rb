# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, except: %i[index create]

  def index
    @redirection_list = Redirection.all
  end

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

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("deleted_successfully") }
    else
      render status: :unprocessable_entity, json: { error: @redirection.errors.full_messages.to_sentence }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from, :to)
    end

    def load_redirection
      @redirection = Redirection.find_by(id: params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("not_found", entity: "Redirection") }
      end
    end
end
