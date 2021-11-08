import { Link } from "react-router-dom";

export default function MenuItem(props) {

    return (
        <Link className="menu-item" to={props.destination}>
            {props.img}
            {props.name}
        </Link>
    );

}