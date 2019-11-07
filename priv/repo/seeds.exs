# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Time1.Repo.insert!(%Time1.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Time2.Repo
alias Time2.Managers.Manager
alias Time2.Workers.Worker
alias Time2.Jobs.Job

Repo.insert!(%Manager{name: "Alice Anderson", email: "alice@acme.com"})
Repo.insert!(%Manager{name: "Bob Anderson", email: "bob@acme.com"})

Repo.insert!(%Worker{name: "Carol Anderson", email: "carol@acme.com", manager_id: 1})
Repo.insert!(%Worker{name: "Dave Anderson", email: "dave@acme.com", manager_id: 2})

Repo.insert!(%Job{name: "Cyborg Arm", job_code: "VAOR-01", budget: 20, description: "Alice", manager_id: 1})
Repo.insert!(%Job{name: "Sobriety Pill", job_code: "VAOR-02", budget: 45, description: "Bob", manager_id: 2})
Repo.insert!(%Job{name: "Rat Cancer", job_code: "VAOR-03", budget: 12, description: "Alice", manager_id: 1})
