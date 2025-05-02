export default function Notifications() {
  return (
    <div
      className="tooltip tooltip-right flex gap-3 items-center p-2 cursor-pointer hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out rounded-lg z-50 hover:bg-zinc-100 "
      data-tip="Notification"
    >
      <i className="ri-notification-line text-2xl"></i>
      <span className="text-lg">Notifications</span>
    </div>
  );
}
