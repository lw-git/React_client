import React from 'react';

const Error = ({text, hideError, timeout}) => {
  setTimeout(hideError, timeout);
  return (
    <div className={"alert alert-danger alert-dismissible text-center"}>
      <button className={"close"} type={"button"}>
        <span onClick={hideError} aria-hidden="true">×</span>
      </button>
      <p className={'text-center h4'}>{text}</p>
    </div>
  )
}

export default Error;