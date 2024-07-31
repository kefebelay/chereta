import ThemeSwitcher from "../components/common/ThemeSwitcherBtn";
export default function NotFoundPage() {
  return (
    <div>
      <div className="hidden">
        <ThemeSwitcher />
      </div>
      <div className="grid h-screen place-items-center">
        <img
          src="/assets/img/404-page-not-found-img.png"
          className=" h-80 w-80 bg-background min-w-4 min-h-4"
        />
      </div>
    </div>
  );
}
