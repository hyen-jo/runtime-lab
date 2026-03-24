import ToggleButton from "../feature/ToggleButton";
import useToggle from "../hooks/useToggle";

const Home = () => {
  // disabled 상태를, 만약 더미 데이터의 값중에 특정 값이 존재할 때로 설정
  const dummyData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  const isDisabled = dummyData.some((item) => item.id === 4);

  const [value, set] = useToggle(false);
  return (
    <div>
      <ToggleButton value={value} onChange={set} disabled={isDisabled} />
    </div>
  );
};

export default Home;
