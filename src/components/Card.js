import React, { Component, useContext } from "react";
import { useState } from "react";
import { ListContext } from "./ListContext";
import ModalBox from "./ModalBox";

export default function (props) {
    const [showModal, setShowModal] = useState(false);
	const { deleteItemInList } = useContext(ListContext);

    function removeModal() {
        setShowModal(false);
    };

    function addModal() {
        setShowModal(true);
    };

    function deleteItem() {
        
        const { item } = props;

        deleteItemInList(item);
    };

    const { item } = props;
    return (
        <div className="cardBox">
            <div>{item.title}</div>
            <div className="card-flex">
                <button onClick={addModal}>edit</button>
                <button onClick={deleteItem}>delete</button>
            </div>
            {showModal && (
                <ModalBox
                    removeModal={removeModal}
                    currentlySaved={true}
                    item={item}
                    componentName={item.componentName}
                />
            )}
        </div>
    );
}
