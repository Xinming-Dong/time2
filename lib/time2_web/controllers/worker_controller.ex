defmodule Time2Web.WorkerController do
  use Time2Web, :controller

  alias Time2.Workers
  alias Time2.Workers.Worker

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    workers = Workers.list_workers()
    render(conn, "index.json", workers: workers)
  end

  def create(conn, %{"worker" => worker_params}) do
    with {:ok, %Worker{} = worker} <- Workers.create_worker(worker_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.worker_path(conn, :show, worker))
      |> render("show.json", worker: worker)
    end
  end

  def show(conn, %{"id" => id}) do
    worker = Workers.get_workers_by_manager_id(id)
    # TODO: remove this print
    # IO.inspect worker
    sheets = Enum.map(worker, fn w -> 
      Time2.Sheets.manager_get_sheet_by_worker_id(w.id)
    end)
    sheets = Enum.reduce(sheets, [], fn(x, acc) -> Enum.concat(x, acc) end)
    worker = Enum.map(sheets, fn s ->
      %{id: s.id, date: s.date, worker_name: Time2.Workers.get_name_by_id(s.worker_id).name, approve_status: s.approve_status}
    end)
    IO.inspect sheets
    render(conn, "manager_show_sheets.json", worker: worker)
  end

  def update(conn, %{"id" => id, "worker" => worker_params}) do
    worker = Workers.get_worker!(id)

    with {:ok, %Worker{} = worker} <- Workers.update_worker(worker, worker_params) do
      render(conn, "show.json", worker: worker)
    end
  end

  def delete(conn, %{"id" => id}) do
    worker = Workers.get_worker!(id)

    with {:ok, %Worker{}} <- Workers.delete_worker(worker) do
      send_resp(conn, :no_content, "")
    end
  end
end
