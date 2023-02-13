import ProCard from '@ant-design/pro-card';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import FG from './FG';
export default (props: {
  items: M.FG[];
  keys: string[];
  itemCopy: (key: string) => void;
  itemDelete: (key?: string) => void;
  dragEndEvent: (props: any) => void;
}) => {
  class MyPointerSensor extends PointerSensor {
    static activators = [
      {
        eventName: 'onPointerDown',
        handler: ({ nativeEvent: event }) => {
          if (
            !event.isPrimary ||
            event.button !== 0 ||
            event.target.tagName.toLowerCase() == 'svg' ||
            event.target.tagName.toLowerCase() == 'path' 
          ) {
            return false;
          }

          return true;
        },
      },
    ];
  }
  const sensors = useSensors(useSensor(MyPointerSensor));

  return (
    <DndContext sensors={sensors} onDragEnd={props.dragEndEvent}>
      <SortableContext items={props.keys}>
        <ProCard wrap gutter={[8, 8]} ghost>
          {props.items.map((item, index) => {
            return (
              <ProCard colSpan="112px" key={props.keys[index]} ghost>
                <FG
                  id={props.keys[index]}
                  item={item}
                  itemKey={props.keys[index]}
                  itemCopy={props.itemCopy}
                  itemDelete={props.itemDelete}
                />
              </ProCard>
            );
          })}
        </ProCard>
      </SortableContext>
    </DndContext>
  );
};
