defmodule Time2Web.SheetController do
  use Time2Web, :controller

  alias Time2.Sheets
  alias Time2.Sheets.Sheet
  alias Time2.Workers
  alias Time2.Workers.Worker

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def approve(conn, %{"manager_id" => manager_id, "id" => id}) do
    sheets = Sheets.approve(id)
    worker = Workers.get_workers_by_manager_id(manager_id)
    sheet = Enum.map(worker, fn w -> 
      Sheets.manager_get_sheet_by_worker_id(w.id)
    end)
    sheet = Enum.reduce(sheet, [], fn(x, acc) -> Enum.concat(x, acc) end)
    sheet = Enum.map(sheet, fn s ->
      %{id: s.id, date: s.date, worker_name: Time2.Workers.get_name_by_id(s.worker_id).name, approve_status: s.approve_status}
    end)
    render(conn, "approve.json", sheet: sheet)
  end

  def create(conn, %{"current_worker_id" => current_worker_id, "date" => date, "job_code" => job_code, "hour" => hour, "note" => note}) do
    hour = Enum.map(hour, fn h -> (
      if h == 0 do
        0
      else
        {a, _} = Integer.parse(h)
        a
      end
    )end)
    hour_sum = Enum.reduce(hour, fn h, acc -> h + acc end)
    # TODO: "no more than 8 hours"
    if hour_sum <= 8 do
      
      case Sheets.create_sheet(%{worker_id: current_worker_id, date: date, approve_status: false}) do
        {:ok, sheet} ->
          entry = Enum.zip([job_code, hour, note])

          Enum.map(entry, fn {c, h, n} -> {
            if h != 0 do
              IO.inspect Time2.Tasks.create_task(%{sheet_id: sheet.id, job_id: Time2.Jobs.get_jobid_by_code(c), hour: h, note: n})
            end
          } end)
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
          |> render("create.json", sheet: sheet)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet_by_worker_id(id)
    render(conn, "show.json", sheet: sheet)
  end

  def update(conn, %{"id" => id, "sheet" => sheet_params}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, sheet_params) do
      render(conn, "show.json", sheet: sheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{}} <- Sheets.delete_sheet(sheet) do
      send_resp(conn, :no_content, "")
    end
  end
end
