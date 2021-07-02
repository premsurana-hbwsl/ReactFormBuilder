import React from 'react';
import update from 'immutability-helper';

export class ListContextProvider extends React.Component {
    state = {
        List: [],
        count: 0,
    };

    addToList = (data) => {
        this.setState({
            List: [...this.state.List, data],
            count: this.state.count + 1,
        });
    }

    editList = ( data ) => {
        const newList = this.state.List.slice();
        for(let i = 0; i<newList.length; i++) {
            if(data.id === newList[i].id) {
                newList[i] = data;
                break;
            }
        }

        this.setState({
            List: newList,
        });
    }

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.List[dragIndex];
        const newList = this.state.List.slice();

        let newCardList = update(newList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        });

        this.setState({
            List: newCardList,
        });
    };

    getCount = () => {
        return this.state.count;
    }

    deleteItemInList = ( data ) => {
        const newList = this.state.List.slice();
        for(let i = 0; i<newList.length; i++) {
            if(data.id === newList[i].id) {
                newList.splice(i, 1);
                break;
            }
        }

        this.setState({
            List: newList,
        });
    }

    render() {
        return (
            <ListContext.Provider
                value={{ ...this.state, addToList: this.addToList, getCount: this.getCount, editList: this.editList, deleteItemInList: this.deleteItemInList, moveCard: this.moveCard }}
            >
                {this.props.children}
            </ListContext.Provider>
        );
    }
}
  
export const ListContext = React.createContext();