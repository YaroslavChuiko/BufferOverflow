import React, { useState } from 'react';

import s from './Pagination.module.scss';

const Pagination = ({ page: activePage = 1, count = 1, onChange: setActivePage }) => {
  const items = Array.from({ length: count }).map((_, index) => index + 1);

  const handleClickPrev = (e) => {
    e.preventDefault();
    setActivePage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleClickNext = (e) => {
    e.preventDefault();
    setActivePage((prev) => (prev < count ? prev + 1 : prev));
  };

  const handleClickPage = (e, val) => {
    e.preventDefault();
    setActivePage(val);
  };

  const cancelClick = (e) => {
    e.preventDefault();
  };

  let content;
  const firstPage = (
    <>
      <button key={1} className={1 === activePage ? `${s.button} ${s.active}` : s.button} onClick={(e) => handleClickPage(e, 1)}>
        1
      </button>
      <span className={s.more}>...</span>
    </>
  );

  const lastPage = (
    <>
      <span className={s.more}>...</span>
      <button key={count} className={s.button} onClick={(e) => handleClickPage(e, count)}>
        {count}
      </button>
    </>
  );

  if (count <= 5) {
    content = items.map((val) => {
      const className = val === activePage ? `${s.button} ${s.active}` : s.button;

      return (
        <button key={val} className={className} onClick={(e) => handleClickPage(e, val)}>
          {val}
        </button>
      );
    });
  } else if (activePage <= 3) {
    content = (
      <>
        {items.slice(0, 4).map((val) => {
          const className = val === activePage ? `${s.button} ${s.active}` : s.button;

          return (
            <button key={val} className={className} onClick={(e) => handleClickPage(e, val)}>
              {val}
            </button>
          );
        })}
        {lastPage}
      </>
    );
  } else if (activePage >= count - 2) {
    content = (
      <>
        {firstPage}
        {items.slice(count - 4, count).map((val) => {
          const className = val === activePage ? `${s.button} ${s.active}` : s.button;

          return (
            <button key={val} className={className} onClick={(e) => handleClickPage(e, val)}>
              {val}
            </button>
          );
        })}
      </>
    );
  } else {
    content = (
      <>
        {firstPage}
        {items.slice(activePage - 2, activePage + 1).map((val) => {
          const className = val === activePage ? `${s.button} ${s.active}` : s.button;

          return (
            <button key={val} className={className} onClick={(e) => handleClickPage(e, val)}>
              {val}
            </button>
          );
        })}
        {lastPage}
      </>
    );
  }

  return (
    <div className={s.pagination}>
      <button
        className={s.button}
        disabled={activePage === 1 ? true : false}
        onClick={activePage === 1 ? cancelClick : handleClickPrev}
      >
        Prev
      </button>
      {content}
      <button
        className={s.button}
        disabled={activePage === count ? true : false}
        onClick={activePage === count ? cancelClick : handleClickNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
