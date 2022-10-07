import { Button, Text } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../store/selectors';
import { userSlice } from '../../store/slices/userSlice';

const SelectPageSize = () => {
  const pageSizes = [5, 15, 25];
  const dispatch = useDispatch();
  const { pageSize } = useSelector(selectUser);

  const handleClick = (e, val) => {
    e.preventDefault();
    if (val != pageSize) {
      dispatch(userSlice.actions.setPageSize({ pageSize: val }));
      localStorage.setItem('pageSize', JSON.stringify(val));
    }
  };

  return (
    <div>
      <Text small type="secondary" mr="10px">
        Per page:
      </Text>

      {pageSizes.map((item) => {
        return (
          <Button
            key={item}
            auto
            type="success-light"
            ghost={item != pageSize}
            onClick={(e) => handleClick(e, item)}
            scale={0.6}
            mr="5px"
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default SelectPageSize;
