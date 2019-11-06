defmodule Time2.Workers.Worker do
  use Ecto.Schema
  import Ecto.Changeset

  schema "workers" do
    field :email, :string
    field :name, :string
    # field :manager_id, :id
    
    belongs_to :manager, Time2.Managers.Manager
    has_many :sheets, Time2.Sheets.Sheet

    timestamps()
  end

  @doc false
  def changeset(worker, attrs) do
    worker
    |> cast(attrs, [:name, :email, :manager_id])
    |> validate_required([:name, :email, :manager_id])
    |> unique_constraint(:email)
  end
end
