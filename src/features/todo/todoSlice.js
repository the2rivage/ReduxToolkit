import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid is a small library that generates unique IDs. It's often used in Redux to create unique identifiers for items in a list.

const initialState = {
  todos: [{ id: 1, text: "hello world" }],
};
// initialState is cumpulsory for createSlice. It defines the initial state of the slice

// Creating a slice (name + state + reducers)
export const todoSlice = createSlice({
  name: "todo", // name is used to identify the slice. 
  initialState,
  reducers: {
    // state is the current state of todos. 
    // action stores the value that is passed when the function is called.
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload, // payload is the default property of action that stores the value passed when the function is called. In this case, it's the text of the todo item.
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((curr) => curr.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
// 
export default todoSlice.reducer;
