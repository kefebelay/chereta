export default function Notification({ Count }) {
  return (
    <div>
      <i className="fa-solid fa-bell text-primary text-3xl bg-transparent flex">
        <span className="text-white font-extrabold text-xs bg-red-500 rounded-full px-1 h-fit">
          {Count}
        </span>
      </i>
    </div>
  );
}
