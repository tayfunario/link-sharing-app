import { Dashboard } from "../components/Dashboard";
import { Preview } from "../components/Preview";

export default function Home() {
  return (
    <div id="container" className="min-h-screen box-border font-Poppins">
      <div className="flex p-6 gap-x-4">
        <Preview />
        <Dashboard />
      </div>
    </div>
  );
}
