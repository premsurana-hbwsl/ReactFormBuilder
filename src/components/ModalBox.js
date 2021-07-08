import React, { Component } from 'react'
import { ListContext } from './ListContext';

export default class ModalBox extends Component {

	static contextType = ListContext;

	constructor(props) {
		super(props);
	}

	state = {
		title: '',
		description: '',
		buttonLabel: '',
		componentName: '',
	}

	componentDidMount() {
		if ( this.props?.currentlySaved ) {
			this.setState({
				...this.props.item
			});
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}

	saveToList = () => {
		if ( this.props?.newlyCreated ) {
			const { addToList, generateId } = this.context;
			const { setShowModalBox, componentName } = this.props;
			const data = {...this.state, id: generateId(), componentName: componentName};
			addToList(data);
			setShowModalBox(false);
		}
		else if ( this.props?.currentlySaved ) {
			const data = {
				...this.state
			};

			const { editList } = this.context;
			editList(data);
			const { removeModal } = this.props;

			removeModal();
		}
	}
	
	addElementsAsPerComponentName = (componentName) => {
		switch( componentName ) {
			case 'Cover Page':
				return (
					<div>
						<input type="file" />
						<label>Title</label>
						<input type="text" placeholder="Set Title" name="title" value={this.state.title} onChange={this.handleChange}/>
						<label>Description</label>
						<input type="text" placeholder="Set Description" name="description" value={this.state.description} onChange={this.handleChange}/>
						<label>Button</label>
						<input type="text" placeholder="Button Label" name="buttonLabel" value={this.state.buttonLabel} onChange={this.handleChange}/>
					</div>
				);

			case 'Image Questions':
				return <input type="file" />
		}
	}

	render() {
		const { newlyCreated, componentName } = this.props;
		return (
			<div>
				<div className="modalContent">
					<div className="modalContent-left">
						{this.addElementsAsPerComponentName(componentName)}
						<hr />
						<button type="button" onClick={this.saveToList}>Save</button>
					</div>
					<div className="modalContent-right">

					</div>
				</div>
			</div>
		)
	}
}
