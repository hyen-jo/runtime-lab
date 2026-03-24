import { useEffect, useState } from "react";
import ToggleButton from "../feature/ToggleButton";
import useToggle from "../hooks/useToggle";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const isDisabled = todos.length === 0;

  const [value, set] = useToggle(false);
  return (
    <div>
      <ToggleButton value={value} onChange={set} disabled={isDisabled} />
    </div>
  );
};

export default Home;
