import React from 'react';

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
                value={{ ...this.state, addToList: this.addToList, getCount: this.getCount, editList: this.editList, deleteItemInList: this.deleteItemInList }}
            >
                {this.props.children}
            </ListContext.Provider>
        );
    }
}
  
export const ListContext = React.createContext();