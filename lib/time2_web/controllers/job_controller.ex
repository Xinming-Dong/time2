defmodule Time2Web.JobController do
  use Time2Web, :controller

  alias Time2.Jobs
  alias Time2.Jobs.Job

  action_fallback Time2Web.FallbackController

  def index(conn, _params) do
    jobs = Time2.Jobs.list_job_codes()
    IO.puts(">>>>>>>>>>>")
    IO.inspect jobs
    render(conn, "codes.json", jobs: jobs)
  end

  def create(conn, %{"job" => job_params}) do
    with {:ok, %Job{} = job} <- Jobs.create_job(job_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.job_path(conn, :show, job))
      |> render("show.json", job: job)
    end
  end

  def show(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)
    render(conn, "show.json", job: job)
  end

  def update(conn, %{"id" => id, "job" => job_params}) do
    job = Jobs.get_job!(id)

    with {:ok, %Job{} = job} <- Jobs.update_job(job, job_params) do
      render(conn, "show.json", job: job)
    end
  end

  def delete(conn, %{"id" => id}) do
    job = Jobs.get_job!(id)

    with {:ok, %Job{}} <- Jobs.delete_job(job) do
      send_resp(conn, :no_content, "")
    end
  end
end
