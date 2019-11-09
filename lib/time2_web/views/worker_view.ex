defmodule Time2Web.WorkerView do
  use Time2Web, :view
  alias Time2Web.WorkerView

  def render("index.json", %{workers: workers}) do
    %{data: render_many(workers, WorkerView, "worker.json")}
  end

  def render("show.json", %{worker: worker}) do
    %{data: render_one(worker, WorkerView, "worker.json")}
  end

  def render("manager_show_sheets.json", %{worker: worker}) do
    %{data: render_many(worker, WorkerView, "manager_view.json")}
  end

  def render("manager_view.json", %{worker: worker}) do
    %{id: worker.id, 
      date: worker.date, 
      worker_name: worker.worker_name, 
      approve_status: worker.approve_status}
  end

  def render("worker.json", %{worker: worker}) do
    %{id: worker.id,
      name: worker.name,
      email: worker.email}
  end
end
