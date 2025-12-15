export const routes = {
  home: "/",
  auth: { login: "/login" },
  todolist: {
    list: "/todolist",
    one: (id: string) => `/todolist/${id}`
  }
}
