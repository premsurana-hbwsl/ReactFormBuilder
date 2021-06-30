import { useDrag } from 'react-dnd';
import { ListContext } from "./ListContext";
import { useContext, useState } from 'react';
import ModalBox from './ModalBox';

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '2rem',
    marginBottom: '2rem',
    cursor: 'move',
    float: 'left',
    width: '100%',
    textAlign: 'center'
};

export const Box = function Box({ name }) {
    const {addToList, getCount} = useContext(ListContext);
    const [showModalBox, setShowModalBox] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                setShowModalBox(true);   
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;
    return (
    <div className="">
    <div ref={drag} role="Box" style={{ ...style, opacity }} data-testid={`box-${name}`}>
			{name}
    </div>
    {showModalBox && <ModalBox
                        setShowModalBox={setShowModalBox}
                        componentName={name}
                        newlyCreated={true}
                    />}
        </div>
    );
};

