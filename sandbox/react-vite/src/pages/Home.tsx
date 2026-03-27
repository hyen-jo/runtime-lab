import ToggleButton from "../feature/ToggleButton";
import useToggle from "../hooks/useToggle";
import { useGetTodos } from "../api/generated";

const Home = () => {
  const { data: todos } = useGetTodos();
  console.log("data", todos);

  const isDisabled = false;

  const [value, set] = useToggle(false);
  return (
    <div>
      <ToggleButton value={value} onChange={set} disabled={isDisabled} />
    </div>
  );
};

export default Home;
