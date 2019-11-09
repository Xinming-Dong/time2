defmodule Time2Web.SheetController do
  use Time2Web, :controller

  alias Time2.Sheets
  alias Time2.Sheets.Sheet

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def approve(conn, id) do
    sheets = Sheets.approve(id)
    IO.puts ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    IO.inspect sheets
    render(conn, "approve.json", sheets: sheets)
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
