import { useSelector } from "react-redux";

function Username() {
  // getting some state from the redux inside a react component is by using useSelector() hook provided by the react-redux
  const username = useSelector((state) => state.username.username);
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
