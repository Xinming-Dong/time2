defmodule Time2Web.TaskController do
  use Time2Web, :controller

  alias Time2.Tasks
  alias Time2.Tasks.Task

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do

    task = Tasks.get_tasks_by_sheet_id(id)
    task = Enum.map(task, fn ts -> 
      %{id: ts.id, hour: ts.hour, job_code: Time2.Jobs.get_code_by_id(ts.job_id), job_name: Time2.Jobs.get_name_by_id(ts.job_id), note: ts.note}
     end)
    render(conn, "show_tasks.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
      render(conn, "show.json", task: task)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
