import Bubble from "./Bubble";

export default function BubbleGroups(props) {

    return (
        <div id="card-component-group">
            {props.bubbles.map((bubb, id) => {
                return <Bubble 
                    key={id}
                    title={bubb.title}
                    destination={bubb.destination}
                    content={bubb.content}
                    centerContent={bubb.centerContent}
                />
            })}        
        </div>
    );

}