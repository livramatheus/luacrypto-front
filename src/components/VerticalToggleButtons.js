import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

export default function VerticalToggleButtons(props) {

    let { selected, handleChange, elements } = props;

    return (
        <ToggleButtonGroup size="small" value={selected} exclusive onChange={handleChange} id="toggle-grafico">
            {
                elements.map((elm) => {
                    return (
                        <ToggleButton value={elm} aria-label={elm} key={elm}>
                            {elm}
                        </ToggleButton>
                    )
                })
            }
        </ToggleButtonGroup>
    );
}

