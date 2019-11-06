defmodule Time2.Managers.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managers" do
    field :email, :string
    field :name, :string

    has_many :workers, Time2.Workers.Worker
    has_many :jobs, Time2.Jobs.Job

    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
    |> unique_constraint(:email)
  end
end
