defmodule Time2Web.WorkerControllerTest do
  use Time2Web.ConnCase

  alias Time2.Workers
  alias Time2.Workers.Worker

  @create_attrs %{
    email: "some email",
    name: "some name"
  }
  @update_attrs %{
    email: "some updated email",
    name: "some updated name"
  }
  @invalid_attrs %{email: nil, name: nil}

  def fixture(:worker) do
    {:ok, worker} = Workers.create_worker(@create_attrs)
    worker
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all workers", %{conn: conn} do
      conn = get(conn, Routes.worker_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create worker" do
    test "renders worker when data is valid", %{conn: conn} do
      conn = post(conn, Routes.worker_path(conn, :create), worker: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.worker_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some email",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.worker_path(conn, :create), worker: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update worker" do
    setup [:create_worker]

    test "renders worker when data is valid", %{conn: conn, worker: %Worker{id: id} = worker} do
      conn = put(conn, Routes.worker_path(conn, :update, worker), worker: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.worker_path(conn, :show, id))

      assert %{
               "id" => id,
               "email" => "some updated email",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, worker: worker} do
      conn = put(conn, Routes.worker_path(conn, :update, worker), worker: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete worker" do
    setup [:create_worker]

    test "deletes chosen worker", %{conn: conn, worker: worker} do
      conn = delete(conn, Routes.worker_path(conn, :delete, worker))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.worker_path(conn, :show, worker))
      end
    end
  end

  defp create_worker(_) do
    worker = fixture(:worker)
    {:ok, worker: worker}
  end
end
