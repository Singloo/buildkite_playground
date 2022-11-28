import "./App.css";
import PureContextApp from "./pureContext";
import { Demo1 } from "./withXeno/components";
import { Tab } from "@headlessui/react";
function App() {
  return (
    <div className="App">
      <Tab.Group>
        <Tab.List className={"flex flex-row gap-3 justify-center"}>
          <Tab
            className={"bg-amber-300 rounded-md px-1 ui-selected:bg-red-300"}
          >
            {"With Context"}
          </Tab>
          <Tab
            className={"bg-amber-300 rounded-md px-1 ui-selected:bg-red-300"}
          >
            {"<Xeno> Demo1"}
          </Tab>
        </Tab.List>
        <Tab.Panels className={"flex flex-1"}>
          <Tab.Panel className={"flex flex-1"}>
            <PureContextApp />
          </Tab.Panel>
          <Tab.Panel className={"flex flex-1 bg-slate-300"}>
            <Demo1 name={"Demo1"} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
