defmodule Time2Web.TaskView do
  use Time2Web, :view
  alias Time2Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task.json")}
  end

  def render("show_tasks.json", %{task: task}) do
    %{data: render_many(task, TaskView, "task_table.json")}
  end
  def render("task_table.json", %{task: task}) do
    %{id: task.id,
      hour: task.hour, 
      job_code: task.job_code, 
      name: task.job_name, 
      note: task.note}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      hour: task.hour,
      note: task.note}
  end
end
