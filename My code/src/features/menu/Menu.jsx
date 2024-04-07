import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // step3:providing the data fetched from the loader to the page
  // using a useLoaderData() hook from the react-router-dom package
  const menu = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// step1:creating a loader function
// creating a loader for fetching data using react router:this function will fetch the data and will return it
export async function loader() {
  // fetching the data of menu
  const menu = await getMenu();
  return menu;
}
export default Menu;
