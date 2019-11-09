defmodule Time2.Jobs do
  @moduledoc """
  The Jobs context.
  """

  import Ecto.Query, warn: false
  alias Time2.Repo

  alias Time2.Jobs.Job

  @doc """
  Returns the list of jobs.

  ## Examples

      iex> list_jobs()
      [%Job{}, ...]

  """
  def list_jobs do
    Repo.all(Job)
  end

  @doc """
  Gets a single job.

  Raises `Ecto.NoResultsError` if the Job does not exist.

  ## Examples

      iex> get_job!(123)
      %Job{}

      iex> get_job!(456)
      ** (Ecto.NoResultsError)

  """
  def get_job!(id), do: Repo.get!(Job, id)

  @doc """
  Creates a job.

  ## Examples

      iex> create_job(%{field: value})
      {:ok, %Job{}}

      iex> create_job(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_job(attrs \\ %{}) do
    %Job{}
    |> Job.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a job.

  ## Examples

      iex> update_job(job, %{field: new_value})
      {:ok, %Job{}}

      iex> update_job(job, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_job(%Job{} = job, attrs) do
    job
    |> Job.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Job.

  ## Examples

      iex> delete_job(job)
      {:ok, %Job{}}

      iex> delete_job(job)
      {:error, %Ecto.Changeset{}}

  """
  def delete_job(%Job{} = job) do
    Repo.delete(job)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking job changes.

  ## Examples

      iex> change_job(job)
      %Ecto.Changeset{source: %Job{}}

  """
  def change_job(%Job{} = job) do
    Job.changeset(job, %{})
  end

  def get_jobid_by_code(code) do
    # get id
    query = from j in "jobs", where: j.job_code == ^code, select: j.id
    IO.inspect(Repo.all(query))
    Enum.at(Repo.all(query), 0)
  end

  def get_code_by_id(id) do
    # get code
    query = from j in "jobs", where: j.id == ^id, select: j.job_code
    Enum.at(Repo.all(query), 0)
  end

  def get_name_by_id(id) do
    query = from j in "jobs", where: j.id == ^id, select: j.name
    Enum.at(Repo.all(query), 0)
  end

  def list_job_codes() do
    query = from j in "jobs", select: j.job_code
    Repo.all(query)
  end
end
