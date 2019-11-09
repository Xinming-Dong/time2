defmodule Time2Web.JobView do
  use Time2Web, :view
  alias Time2Web.JobView

  def render("index.json", %{jobs: jobs}) do
    %{data: render_many(jobs, JobView, "job.json")}
  end

  def render("codes.json", %{jobs: jobs}) do
    %{job_codes: jobs}
  end

  def render("show.json", %{job: job}) do
    %{data: render_one(job, JobView, "job.json")}
  end

  def render("job.json", %{job: job}) do
    %{id: job.id,
      name: job.name,
      job_code: job.job_code,
      budget: job.budget,
      description: job.description}
  end
end
