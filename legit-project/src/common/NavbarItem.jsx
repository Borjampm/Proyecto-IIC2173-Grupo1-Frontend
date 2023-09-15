function NavbarItem(props) {
    return (
        <li>
            <a href={props.link} onClick={props.onClick}>
                {props.text}
            </a>
        </li>
    );
}

export default NavbarItem;