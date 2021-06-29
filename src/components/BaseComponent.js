import DropBoard from "./DropBoard";
import { Box } from "./Box";
import ShowBoard from "./ShowBoard";
import ModalBox from "./ModalBox";

export default function BaseComponent() {
    return (
        <div className="App">
			<div className="contentElements" style={{ overflow: 'hidden', clear: 'both' }}>
				<Box name="Cover Page"/>
				<Box name="Image Questions"/>
				<Box name="Form Fields"/>
			</div>
			<div className="dropBoard" style={{ overflow: 'hidden', clear: 'both' }}>
				<DropBoard />
			</div>
        </div>
    );
}
