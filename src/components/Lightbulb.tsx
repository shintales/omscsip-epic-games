import { Show, createSignal } from "solid-js";
import "./Lightbulb.css"
import Lightbulb from '../assets/lightbulb-regular.svg';
import LightbulbSolid from '../assets/lightbulb-solid.svg';

interface LightbulbProps  {
    onClick?: () => void
}

export default (props: LightbulbProps) => {
    const [isClicked, setIsClicked] = createSignal(false)
    const toggleLightbulb = () => {
        setIsClicked(!isClicked());
    };

    return (
        <div class="lightbulb" onClick={() => {
            toggleLightbulb()
            if (props.onClick) props.onClick()
        }}>
            <Show when={isClicked()} fallback={<Lightbulb/>}>
                <LightbulbSolid/>
            </Show>
        </div>
    );
}