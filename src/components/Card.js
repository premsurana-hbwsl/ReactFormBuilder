import React, { Component, useContext } from "react";
import { useState } from "react";
import { ListContext } from "./ListContext";
import ModalBox from "./ModalBox";
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export default function (props) {
    const [showModal, setShowModal] = useState(false);
	const { deleteItemInList, moveCard } = useContext(ListContext);

    const ref = useRef(null);
    const { id, text, index } = props;

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

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
        <div ref={ref} className="cardBox" style={{opacity: opacity}}>
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
