export default function Bubble(props) {
    
    let centerContent = props.centerContent ? 'detail-body-center' : '';
    
    return (
        <div className="card-component" >
            {
                props.title && (
                    <div className="card-component-header">
                        <div className="card-component-title">{props.title}</div>
                        <div className="card-component-details">
                            {props.destination && <a href={props.destination} className="link">View details</a>}
                        </div>
                    </div>
                )
            }
            <div className={centerContent}>
                {props.content}
            </div>
        </div>
    );

}