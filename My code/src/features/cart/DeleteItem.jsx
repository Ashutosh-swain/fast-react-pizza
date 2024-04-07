import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import PropTypes from 'prop-types';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

// prop validation
DeleteItem.propTypes = {
  pizzaId: PropTypes.any,
};
export default DeleteItem;
