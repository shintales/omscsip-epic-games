import { createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import "./ToolTip.css"

interface ToolTipProps {
    text: string,
    altText?: string,
    children: JSX.Element | JSX.Element[],
    onSuccess?: () => void,
}

export default (props: ToolTipProps) => {
    const [useAltText, setUseAltText] = createSignal(false);
    const toggleText = () => {
        if (props.altText) {
            setUseAltText(!useAltText())
            if (useAltText()) {
                if (props.onSuccess) props.onSuccess()
            } 
        }
    }
    return (
        <div class="tooltip" onClick={toggleText}>
            {props.children}
            <span class="tooltipText">{useAltText() ? props.altText : props.text}</span>
        </div>
    )
}