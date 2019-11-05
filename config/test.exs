use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :time2, Time2Web.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :time2, Time2.Repo,
  username: "time2",
  password: "ahngaiZe3Que",
  database: "time2_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
