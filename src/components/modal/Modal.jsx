import React from "react";
import classes from "./modal.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ details, setShowModal }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.background} />
      <div className={classes.content}>
        <h3>{details?.name}</h3>
        <div className={classes.details}>
          <p>
            <span>Color:</span> {details?.color}
          </p>
          <p>
            <span>Pantone Value:</span> {details?.pantone_value}
          </p>
          <p>
            <span>Year:</span> {details?.year}
          </p>
        </div>
        <AiOutlineCloseCircle
          className={classes.closeBtn}
          onClick={() => {
            setShowModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
