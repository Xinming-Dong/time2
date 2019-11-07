defmodule Time2Web.Router do
  use Time2Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", Time2Web do
    pipe_through :ajax

    resources "/managers", ManagerController, except: [:new, :edit]
    resources "/workers", WorkerController, except: [:new, :edit]
    resources "/jobs", JobController, except: [:new, :edit]
    resources "/sheets", SheetController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]

    resources "/sessions", SessionController, only: [:create], singleton: true

    # get "workers/create_sheet", SheetController, :create_sheet
  end

  scope "/", Time2Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
    # get "workers/create_sheet", PageController, :create_sheet

    # resources "/managers", ManagerController, except: [:new, :edit]
    # resources "/workers", WorkerController, except: [:new, :edit]
    # resources "/jobs", JobController, except: [:new, :edit]
    # resources "/sheets", SheetController, except: [:new, :edit]
    # resources "/tasks", TaskController, except: [:new, :edit]
  end

  # Other scopes may use custom stacks.
  # scope "/api", Time2Web do
  #   pipe_through :api
  # end
end
