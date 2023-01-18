import React, { useState } from "react";
import classes from "./table.module.scss";
import Modal from "../modal/Modal";

const Table = ({ products }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  return (
    <>
      <div className={classes.table}>
        <div className={classes.header}>
          <div className={classes.col}>ID</div>
          <div className={classes.col}>NAME</div>
          <div className={classes.col}>YEAR</div>
        </div>
        {products?.map((product, idx) => (
          <div
            className={classes.row}
            key={idx}
            style={{ backgroundColor: `${product.color}` }}
            onClick={() => {
              setModalDetails(product);
              setShowModal(true);
            }}
          >
            <div className={classes.content}>{product.id}</div>
            <div className={classes.content}>{product.name}</div>
            <div className={classes.content}>{product.year}</div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal details={modalDetails} setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Table;
