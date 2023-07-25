import { useAuth } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useFetchTodos() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState<Record<number, string>>({});
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  async function fetchTodos() {
    setLoading(true)
    if (!currentUser) return;
    try {
      const docRef = doc(db, "users", currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodos(docSnap.data()?.todos);
      }
      if (!docSnap.exists) {
        console.log("does not exist");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  function refetch() {
    fetchTodos();
  }
  return { loading, error, todos, refetch };
}
