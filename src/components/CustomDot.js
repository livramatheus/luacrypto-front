export default function CustomDot(props) {
    const { cx, cy, payload } = props;
    
    if (payload.descricao) {
        return (
            <svg
                x={cx - 5}
                y={cy - 5}
                width={10}
                height={10}
                fill="red"
                viewBox="0 0 1024 1024"
            >
                <path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76" />
            </svg>
        );
    }

    return null;
}
