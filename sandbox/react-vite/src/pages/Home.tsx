import ToggleButton from "../feature/ToggleButton";
import useToggle from "../hooks/useToggle";
import {
  useGetTodos,
  useUpdateTodo,
  getGetTodosQueryKey,
} from "../api/generated";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  const { data: todos } = useGetTodos();
  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTodosQueryKey() });
      },
    },
  });

  const isDisabled = false;

  const [value, set] = useToggle(false);
  return (
    <div>
      <ToggleButton value={value} onChange={set} disabled={isDisabled} />
      <ul>
        {todos?.data?.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodo({
                  id: todo.id!,
                  data: { completed: !todo.completed },
                })
              }
            />
            {todo.title}
          </li>
        ))}
      </ul>

      {/* todo 등록 폼  */}
      <Card>
        <CardHeader>
          <CardTitle>Add Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">타이틀</Label>
              <Input id="title" type="text" placeholder="할 일을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">상세</Label>
              <Input id="description" type="text" placeholder="상세 설명 (선택)" />
            </div>
            <Button type="submit" className="w-full">등록</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
