export default function Underline({ h, w, mb, mt, m }) {
  return (
    <div>
      <div
        className={`h-[${h || "0.08rem"}] w-[${
          w || "80%"
        }] bg-text2 mx-auto mb-${mb || 7} mt-${mt || 0}`}
      ></div>
    </div>
  );
}
