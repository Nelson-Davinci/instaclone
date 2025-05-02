export default function Modal({
  id,
  title,
  children,
  isOpen,
  onClose,
  classname,
}) {
  return <div id={id} className={`modal ${isOpen ? "modal-open" : ""}`}>
    <div className={`modal-box ${classname}`}>
        <h3 className="font-bold text-lg text-center">{title}</h3>
        {children}
    </div>
    <div className="modal-backdrop bg-black/60" onClick={onClose}/>
  </div>;
}
