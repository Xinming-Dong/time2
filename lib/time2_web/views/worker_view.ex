defmodule Time2Web.WorkerView do
  use Time2Web, :view
  alias Time2Web.WorkerView

  def render("index.json", %{workers: workers}) do
    %{data: render_many(workers, WorkerView, "worker.json")}
  end

  def render("show.json", %{worker: worker}) do
    %{data: render_one(worker, WorkerView, "worker.json")}
  end

  def render("worker.json", %{worker: worker}) do
    %{id: worker.id,
      name: worker.name,
      email: worker.email}
  end
end
