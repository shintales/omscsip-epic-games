import { JSX, Show, createSignal } from "solid-js";
import "./Carot.css"
import AngleUp from '../assets/angle-up.svg';

interface CarotProps  {
    onClick: () => void
}
export default (props: CarotProps) => {
    const [clicked, setClicked] = createSignal(false);
  
    return (
        <button
        classList={{
            "carot": true,
            "clicked": clicked(),
        }}
        onClick={() => {
            setClicked(!clicked())
            props.onClick()
        }}
        ><AngleUp/></button>
);
}