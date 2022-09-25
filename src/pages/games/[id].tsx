// [id].tsx
import Image from "next/image";
import nextLogo from "../../assets/next.svg";

function App() {
  return (
    <div>
      <span className="logos">
        <a href="/post">
          <Image
            width={144}
            height={144}
            src={nextLogo}
            className="logo tauri"
            alt="Next logo"
          />
        </a>
      </span>
    </div>
  );
}

export default App;
