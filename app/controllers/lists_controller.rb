class ListsController < ApplicationController
  before_action :set_board
  before_action :set_list, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
    def list_params
    end

    def set_board
    end

    def set_list
    end
end
