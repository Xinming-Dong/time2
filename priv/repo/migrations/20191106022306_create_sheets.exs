defmodule Time2.Repo.Migrations.CreateSheets do
  use Ecto.Migration

  def change do
    create table(:sheets) do
      add :date, :date, null: false
      add :approve_status, :boolean, default: false, null: false
      add :worker_id, references(:workers, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:sheets, [:worker_id])
    create unique_index(:sheets, [:worker_id, :date])
  end
end
