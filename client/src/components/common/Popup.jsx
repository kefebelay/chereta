export default function Popup({ popup, setPopup, onYes, message }) {
  return (
    <>
      {popup && (
        <div
          className=" fixed inset-0 h-screen w-screen flex justify-center items-center bg-gray-400 bg-opacity-35"
          onClick={() => setPopup(!popup)}
        >
          <div className="p-10 rounded-lg">
            <h1 className="text-lg p-3">{message}</h1>
            <div className="flex gap-x-9 justify-between p-3 px-10">
              <button
                onClick={() => {
                  onYes();
                  setPopup(!popup);
                }}
                className="btn bg-primary w-full"
              >
                Yes
              </button>
              <button
                onClick={() => setPopup(!popup)}
                className="btn bg-secondary w-full"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
