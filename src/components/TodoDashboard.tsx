import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Input from "./common/Input";
import useFetchTodos from "@/hooks/fetchTodo";

let currentKeyIndex = 0;

const TodoDashboard = () => {
  const auth = useAuth();
  const router = useRouter();
  const [todo, setTodo] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [edit, setEdit] = useState<number | null>(null);
  // fetch todos from db
  const { loading, error, refetch, todos } = useFetchTodos();

  useEffect(() => {
    if (!auth?.currentUser) {
      router.push("/login");
      return;
    }
  }, []);

  // useEffect(() => {
  //   if (!auth?.userInfo || Object.keys(auth?.userInfo).length === 0) {
  //     setAddTodo(true);
  //   }
  // }, [auth?.userInfo]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todo) return;
    const uniqueKey = currentKeyIndex++;
    const newKey = todos.hasOwnProperty(currentKeyIndex)
      ? uniqueKey
      : currentKeyIndex;
    // setTodoList({ [newKey]: todo, ...todoList });
    setTodo("");
    if (auth?.currentUser) {
      const userRef = doc(db, "users", auth?.currentUser.uid);
      try {
        await setDoc(
          userRef,
          {
            todos: { [newKey]: todo },
          },
          { merge: true }
        );
        await refetch();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleEditTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedValue) return;
    const uniqueKey = currentKeyIndex++;
    const newKey = todos.hasOwnProperty(currentKeyIndex)
      ? uniqueKey
      : currentKeyIndex;
    // setTodoList({ [newKey]: todo, ...todoList });
    setTodo("");
    if (auth?.currentUser) {
      const userRef = doc(db, "users", auth?.currentUser.uid);
      try {
        await setDoc(
          userRef,
          {
            todos: { [newKey]: todo },
          },
          { merge: true }
        );
        await refetch();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  console.log("todos >>>", typeof todos);
  // if (todos) {
  //   setTodoList({ ...todos })
  // }
  return (
    <React.Fragment>
      {/* dashboard header */}
      <div className="w-full bg-gray-200 px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-semibold font-sans uppercase">
            Todo App
          </h1>
          <button
            onClick={async () => {
              auth && (await auth?.logout());
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {/* dashboard body */}
      <div className="w-full px-10 my-10">
        <h2 className="text-2xl font-sans font-medium mb-4">Welcome Back!</h2>
        {/* {addTodo && ( */}
        <TodoForm handleAddTodo={handleAddTodo} todo={todo} setTodo={setTodo} />
        {/* )} */}
        {/* {!addTodo && (
          <button
            className="w-full bg-blue-500 text-white rounded py-4 my-4"
            onClick={() => setAddTodo(true)}
          >
            ADD TODO
          </button>
        )} */}
        {loading && (
          <div className="font-bold text-base my-4 text-green-800">
            Loading...
          </div>
        )}
        {/* Display User Info and added todos */}
        {!loading && (
          <>
            {Object.values(todos)
              .reverse()
              .map((item: string, index: number) => (
                <div
                  key={`key_${index}`}
                  className={`${edit === index ? 'my-4 py-3 rounded font-sans font-semibold text-lg text-gray-800' : 'border border-gray-300 my-4 py-3 px-4 rounded font-sans font-semibold text-lg text-gray-800 flex justify-between items-center gap-3'}`}
                >
                  {edit === index && (
                    <TodoForm
                      handleAddTodo={handleEditTodo}
                      todo={editedValue}
                      setTodo={setEditedValue}
                      buttonText="Save"
                    />
                  )}
                  {edit !== index && (
                    <>
                      <span className="flex-1">{item}</span>
                      <button
                        className="text-green-800 font-semibold text-base"
                        onClick={() => setEdit(index)}
                      >
                        Edit
                      </button>
                      <button className="text-red-600 font-semibold text-base">
                        X
                      </button>
                    </>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default TodoDashboard;

const TodoForm: React.FC<{
  handleAddTodo: (e: React.FormEvent) => void;
  setTodo: (e: string) => void;
  todo: string;
  buttonText?: string;
}> = ({ handleAddTodo, setTodo, todo, buttonText = 'Add' }) => (
  <form onSubmit={handleAddTodo}>
    <div className='flex'>
      <Input
        type="text"
        id="todo"
        placeholder="Add Todo"
        name="todo"
        className="border-2 rounded-r-none"
        value={todo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTodo(e.target.value)
        }
      />
      <button
        className="bg-yellow-300 px-6 font-medium font-sans rounded rounded-l-none"
        onClick={handleAddTodo}
        type="submit"
      >
        {buttonText}
      </button>
    </div>
  </form>
);
