defmodule Time2Web.SessionController do
    use Time2Web, :controller
  
    action_fallback Time2Web.FallbackController
  
    alias Time2.Workers
    alias Time2.Managers
  
    def create(conn, %{"email" => email, "type" => type}) when type == "worker" do
      # TODO: remove this print
      IO.puts "session controller create"
      IO.inspect type
      worker = Workers.authenticate_worker(email)
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

    def create(conn, %{"email" => email, "type" => type}) when type == "manager" do
      # TODO: remove this print
      IO.puts "session controller create"
      IO.inspect type
      manager = Managers.authenticate_manager(email)
      if manager do
        token = Phoenix.Token.sign(conn, "session", manager.id)
        resp = %{token: token, manager_id: manager.id, manager: manager.name}
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