defmodule Time2Web.SessionController do
    use Time2Web, :controller
  
    action_fallback Time2Web.FallbackController
  
    alias Time2.Workers
    alias Time2.Managers
  
    def create(conn, %{"worker_email" => worker_email}) do
      # TODO: remove this print
      IO.puts "session controller create"
      worker = Workers.authenticate_worker(worker_email)
      if worker do
        token = Phoenix.Token.sign(conn, "session", worker.id)
        resp = %{token: token, worker_id: worker.id, worker_name: worker.name}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Authentication Failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end
    end

    def create(conn, %{"manager_email" => manager_email}) do
      # TODO: remove this print
      IO.puts "session controller create"
      manager = Managers.authenticate_manager(manager_email)
      if manager do
        token = Phoenix.Token.sign(conn, "session", manager.id)
        resp = %{token: token, manager_id: manager.id, manager_name: manager.name}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Authentication Failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end
    end
  end