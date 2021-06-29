import React from 'react';
import { useContext } from 'react';
import Card from './Card';
import { ListContext } from "./ListContext";

function ShowBoard() {
	const { List } = useContext(ListContext);
	return (
		<div className="showBoard">
			{List.map(function( item, index ) {
				return <Card key={index} item={item} currentlySaved={true}></Card>;
			})}
		</div>
	);
}

export default ShowBoard
