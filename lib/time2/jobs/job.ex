defmodule Time2.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :integer
    field :description, :string, default: "a self-defined job"
    field :job_code, :string
    field :name, :string
    # field :manager_id, :id

    belongs_to :manager, Time2.Managers.Manager
    has_many :tasks, Time2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:name, :job_code, :budget, :description, :manager_id])
    |> validate_required([:name, :job_code, :budget, :description, :manager_id])
  end
end
