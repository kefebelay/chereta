// eslint-disable-next-line react/prop-types
function Description({ description }) {
  return <p>{description}</p>;
}
// eslint-disable-next-line react/prop-types
function Bids({ bids }) {
  return (
    <div>
      <p>{bids || "bid1"}</p>
      <p>{bids || "bid2"}</p>
      <p>{bids || "bid3"}</p>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Comments({ comments }) {
  return (
    <div>
      <p>{comments || "comment1"}</p>
      <p>{comments || "comment2"}</p>
      <p>{comments || "comment3"}</p>
    </div>
  );
}
export { Description, Bids, Comments };
