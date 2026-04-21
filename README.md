<img width="1357" height="365" alt="image" src="https://github.com/user-attachments/assets/8e5eba3f-8dbe-4000-baec-32bd3bdf80eb" />

## 📌 Redux Toolkit kya hai?

Redux ka **official, simplified version**. Iska kaam hai **global state manage** karna — matlab aisa data jo poori app ko chahiye hota hai, sirf ek component ko nahi.

> Without RTK → bahut boilerplate. With RTK → clean aur fast.

---

## 🔄 Data Flow (ek hi direction mein chalta hai)
<img width="828" height="367" alt="image" src="https://github.com/user-attachments/assets/28200640-61e7-4bea-ace1-6d5539f8a397" />

```
UI (Component) → dispatch(action) → Reducer → Store (State) → UI Update
```

> User kuch karta hai → dispatch hota hai → reducer state badalta hai → UI reflect karta hai

---
<img width="2752" height="1536" alt="image" src="https://github.com/user-attachments/assets/a6fcd305-425b-48e9-80e7-cd34c623b686" />


## 🧱 Teen Main Cheezein

| Cheez | Kya karta hai |
|-------|---------------|
| **Store** | Ek global dabba jahan poori app ka state rehta hai. Sirf ek store hota hai. |
| **Slice** | Ek feature ka state + reducers ek saath. Jaise `todo` feature ka apna slice. |
| **Reducer** | Pure function jo state update karta hai. Action ke response mein state kaise badlegi yeh decide karta hai. |

---

## 📁 File Structure (Is Project Ki)

```
src/
├── app/
│   └── store.js           ← configureStore yahan
├── features/
│   └── todo/
│       └── todoSlice.js   ← createSlice yahan
└── components/
    ├── AddTodo.jsx        ← useDispatch use karta hai
    └── Todos.jsx          ← useSelector use karta hai
```

---

## 1️⃣ store.js — `configureStore`

```js
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: todoReducer  // todoSlice ka reducer yahan diya
});
```

**`configureStore`** store banata hai. Iske andar `reducer` pass karo.

> Ek hi slice hai toh directly reducer diya.  
> Multiple slices hotey toh object dete: `{ todo: todoReducer, user: userReducer }`

---

## 2️⃣ todoSlice.js — `createSlice`

`createSlice` ko **teen cheezein chahiye**: `name`, `initialState`, `reducers`

```js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "hello world" }],
  // yeh default state hai jab app pehli baar load hoti hai
};

export const todoSlice = createSlice({
  name: "todo",       // slice ka unique naam
  initialState,       // starting state (compulsory hai)
  reducers: {
    // reducers functions hain jo state change karte hain
  },
});
```

---

### ➕ `addTodo` reducer

```js
addTodo: (state, action) => {
  const newTodo = {
    id: nanoid(),         // unique ID generate karta hai (RTK built-in)
    text: action.payload  // dispatch karte waqt jo value di, woh yahan aati hai
  };
  state.todos.push(newTodo); // directly push karo — RTK andar Immer use karta hai, safe hai
},
```

- **`state`** = current todos list
- **`action.payload`** = jo value dispatch karte waqt bheji gayi
- **`nanoid()`** = RTK ka built-in unique ID generator

---

### ❌ `removeTodo` reducer

```js
removeTodo: (state, action) => {
  state.todos = state.todos.filter(
    (curr) => curr.id !== action.payload  // matching id wala hata do
  );
},
```

- **`action.payload`** mein todo ka `id` aata hai
- Filter se woh todo remove ho jaata hai

---

### 📤 Slice se kya Export karte hain?

```js
// actions → components mein dispatch karne ke liye
export const { addTodo, removeTodo } = todoSlice.actions;

// reducer → store mein dene ke liye
export default todoSlice.reducer;
```

| Export | Kahan use hoga |
|--------|----------------|
| `todoSlice.actions` | Components mein — `dispatch(addTodo(...))` |
| `todoSlice.reducer` | store.js mein — `configureStore({ reducer: ... })` |

---

## 3️⃣ Do Important Hooks

### `useDispatch` — Action bhejo (Write)

```js
import { useDispatch } from "react-redux";
import { addTodo, removeTodo } from "../features/todo/todoSlice";

const dispatch = useDispatch();

// todo add karna
dispatch(addTodo(input));     // input → action.payload ban jaata hai

// todo remove karna
dispatch(removeTodo(todo.id)); // id → action.payload ban jaata hai
```

> Jab dispatch hota hai, jo value di wo `action.payload` mein reducer tak pohonchti hai.

---

### `useSelector` — State padho (Read)

```js
import { useSelector } from "react-redux";

const todos = useSelector((state) => state.todos);
// ab todos array freely use kar sakte ho component mein
```

> State ka subscriber hai. Jab bhi state badle, component automatically re-render hota hai.

---

## 4️⃣ App.js — `Provider`

```js
import { Provider } from "react-redux";
import { store } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <AddTodo />  {/* useDispatch use karta hai */}
      <Todos />    {/* useSelector use karta hai */}
    </Provider>
  );
}
```

> **`Provider`** store ko poori React app ke andar available karta hai.  
> Iske bahar koi bhi component `useDispatch` ya `useSelector` use **nahi** kar sakta.

---

## ⚡ Quick Recap — Yaad Rakhne Ki Cheezein

| Cheez | Kaam |
|-------|------|
| `createSlice` | name + initialState + reducers → slice banata hai |
| `action.payload` | dispatch karte waqt jo value di, woh yahan milti hai |
| `configureStore` | store banata hai, reducer leta hai |
| `Provider` | store ko poori app mein inject karta hai |
| `useDispatch` | action bhejo — state change karo (write) |
| `useSelector` | store se state padho (read) |
| `nanoid()` | unique ID banata hai, RTK mein built-in hai |

---

## 🔁 Complete Flow — Ek Example

**Jab user "Buy Milk" type karke Add karta hai:**

```
1. Input field mein "Buy Milk" type kiya
2. Button click → addTodoHandler() call hua
3. dispatch(addTodo("Buy Milk")) call hua
4. addTodo action create hua: { type: "todo/addTodo", payload: "Buy Milk" }
5. todoSlice ka addTodo reducer chala
6. action.payload = "Buy Milk" → naya todo bana with nanoid() ID
7. state.todos mein push hua
8. useSelector wale Todos component ne naya state dekha → re-render hua
9. Screen par "Buy Milk" dikha
```
### 🔹 Reducers
functions that define how the state gets updated

### 🔹 Slices
feature-based sections of the application state.

---

> 💡 **RTK internally Immer.js use karta hai** — isliye state ko directly mutate kar sakte ho (`push`, `filter` etc.) bina spread operator ke. Yeh sirf reducers ke andar safe hai.
Note -
