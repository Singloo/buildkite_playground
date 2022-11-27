import 'reflect-metadata';
import './App.css';
import PureContextApp from './pureContext';
import { Demo1 } from './withXeno/components';
import { Tab } from '@headlessui/react';
function App() {
  return (
    <div className="App">
      <Tab.Group>
        <Tab.List>
          <Tab>{'With Context'}</Tab>
          <Tab>{'<Xeno> Demo1'}</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <PureContextApp />
          </Tab.Panel>
          <Tab.Panel>
            <Demo1 name={'Demo1'}/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
