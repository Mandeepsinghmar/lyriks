import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import './horizontalScrollbar.scss';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button type="button" onClick={() => scrollPrev()} className="arrow">
      <ChevronLeftIcon />
    </button>
  );
}

function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button type="button" onClick={() => scrollNext()} className="arrow">
      <ChevronRightIcon />
    </button>
  );
}
function HorizontalSrollbar({ data, setList, setListType, countryId }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <div
          key={item.id}
          // eslint-disable-next-line
          itemId={item.id}
          title={item.name}
          onClick={(e) => {
            setList(item.listid);
            setListType(e.target.textContent);
            if (countryId) countryId(item.listid);
          }}
        >
          <p className="genre">{item.name}</p>
        </div>
      ))}
    </ScrollMenu>
  );
}
export default HorizontalSrollbar;
