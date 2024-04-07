import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  console.log(order);
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

UpdateOrder.propTypes = {
  order: PropTypes.object,
};
export default UpdateOrder;

// to update the order in the fetcher.Form we need an action function just same as for Form component of react router for data loading we used the action functions
export async function action({ request, params }) {
  console.log(request);
  // basically the params parameter of the action function will give the data from the url
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
