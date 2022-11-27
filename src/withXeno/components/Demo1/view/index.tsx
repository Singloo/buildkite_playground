import { Demo1Store } from 'src/withXeno/stores/Demo1/demo1.store';
import { Demo1Controller } from '../demo1.controller';
import { Button } from 'src/components';

type Demo1Props = {
  controller: Demo1Controller;
  demo1Store: Demo1Store;
  name: string;
};

export const Demo1 = (props: Demo1Props) => {
  const { demo1Store, controller } = props;
  console.warn({
    props,
  });
  return (
    <div className={'flex-1 border-violet-500 border flex-col'}>
      <div>{demo1Store.count}</div>
      <Button
        onClick={() => {
          console.warn('click');
          controller.onClickIncrease();
        }}
      >
        {'Click'}
      </Button>
    </div>
  );
};
