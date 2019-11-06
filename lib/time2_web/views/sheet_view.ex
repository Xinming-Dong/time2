defmodule Time2Web.SheetView do
  use Time2Web, :view
  alias Time2Web.SheetView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{sheet: sheet}) do
    %{data: render_one(sheet, SheetView, "sheet.json")}
  end

  def render("sheet.json", %{sheet: sheet}) do
    %{id: sheet.id,
      date: sheet.date,
      approve_status: sheet.approve_status}
  end
end
