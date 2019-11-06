defmodule Time2.Sheets.Sheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sheets" do
    field :approve_status, :boolean, default: false
    field :date, :date
    # field :worker_id, :id

    belongs_to :worker, Time2.Workers.Worker
    has_many :tasks, Time2.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(sheet, attrs) do
    sheet
    |> cast(attrs, [:date, :approve_status, :worker_id])
    |> validate_required([:date, :approve_status, :worker_id])
    |> unique_constraint(:date, name: :sheets_worker_id_date_index)
  end
end
