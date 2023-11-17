export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_full-photo ${props.card && "popup_opened"}`} >
      <div className="popup__photo">
        <button className="popup__close-btn" type="button" onClick={props.card && props.onCLose}></button>
        <img className="popup__card-photo" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <h2 className="popup__photo-title">{props.card && props.card.name}</h2>
      </div>
    </div>
  );
}
