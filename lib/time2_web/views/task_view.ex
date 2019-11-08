defmodule Time2Web.TaskView do
  use Time2Web, :view
  alias Time2Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      hour: task.hour,
      note: task.note}
  end
end
