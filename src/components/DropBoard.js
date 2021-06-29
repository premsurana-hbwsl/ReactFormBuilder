import { useDrop } from 'react-dnd';
import ShowBoard from './ShowBoard';
import React from 'react';

const style = {
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
    width: '100%',
    height: '100vh',
};

const DropBoard = () => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ name: 'DropBoard' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const isActive = canDrop && isOver;
    let backgroundColor = '#F4EAFC';
    if (isActive) {
        backgroundColor = '#E4F3F4';
    }
    else if (canDrop) {
        backgroundColor = '#E3EDFA';
    }
    return (<div ref={drop} role={'DropBoard'} style={{ ...style, backgroundColor }}>
			{isActive ? 'Release to drop' : 'Drag a box here'}
			<ShowBoard></ShowBoard>
		</div>);
};

export default DropBoard;