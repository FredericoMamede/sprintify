//GENERIC BUTTON COMPONTENT
export function GenericButton(props) {
  return (
    <button
      className={props.className ?? "my-button"}
      onClick={props.onClick}
      style={props.style}
    >
      {props.label}
    </button>
  );
}