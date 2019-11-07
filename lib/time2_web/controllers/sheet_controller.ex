defmodule Time2Web.SheetController do
  use Time2Web, :controller

  alias Time2.Sheets
  alias Time2.Sheets.Sheet

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def create(conn, %{"current_worker_id" => current_worker_id, "date" => date, "job_code" => job_code, "hour" => hour, "note" => note}) do
    hour = Enum.map(hour, fn h -> (
      if h == "" do
        0
      else
        {a, _} = Integer.parse(h)
        a
      end
    )end)
    hour_sum = Enum.reduce(hour, fn h, acc -> h + acc end)
    if hour_sum === 8 do
      
      case Sheets.create_sheet(%{worker_id: current_worker_id, date: date, approve_status: false}) do
        {:ok, sheet} ->
          entry = Enum.zip(job_code, hour, note)
          # TODO: remove this print
          IO.puts("create tasks")
          IO.inspect(entry)
          # job_codes = Time1.Jobs.list_job_codes()
          # Enum.map(entry, fn {c, h} -> {
          #   if h != 0 do
          #     IO.inspect Time1.Tasks.create_task(%{sheet_id: sheet.id, job_id: Time1.Jobs.get_jobid_by_code(c), hour: h, note: "a task created."})
          #   end
          # } end)
          conn
          |> put_status(:created)
          |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
          |> render("show.json", sheet: sheet)
        {:error, %Ecto.Changeset{} = changeset} ->
          conn
          |> put_flash(:error, "Creation error.")
          # render(conn, "create_error.html", hour_sum: hour_sum)
          # render(conn, "new.html", changeset: changeset)
      end
    end
    # with {:ok, %Sheet{} = sheet} <- Sheets.create_sheet(sheet_params) do
    #   conn
    #   |> put_status(:created)
    #   |> put_resp_header("location", Routes.sheet_path(conn, :show, sheet))
    #   |> render("show.json", sheet: sheet)
    # end
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)
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
