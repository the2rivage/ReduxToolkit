import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import { store } from "./app/store";
function App() {
  return (
    <Provider store={store}>
      <div className=" text-center m-5 ">
      <h1 className="text-3xl">Redux Toolkit Todo</h1>
      <AddTodo />
      <Todos />
      </div>
    </Provider>
  );
}

export default App;
