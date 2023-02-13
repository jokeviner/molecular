import { DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import Meta from 'antd/lib/card/Meta';
import { CSS } from '@dnd-kit/utilities';
import { Card } from 'antd';
import FGImage from './FGImage';
import styles from './FG.less';

export default (props: {
  itemKey?: string;
  item: M.FG;
  itemCopy?: (key: string) => void;
  itemDelete: (key?: string) => void;
}) => {
  let attributes, listeners, setNodeRef, transform, style;
  if (props.itemKey) {
    ({ attributes, listeners, setNodeRef, transform } = useSortable({
      id: props.itemKey,
    }));
    style = {
      transform: CSS.Transform.toString(transform),
      width: 96,
    };
  } else {
    attributes = listeners = {};
    setNodeRef = null;
    style = { width: 96 };
  }
  return (
    <Card
      className={styles.fgitem}
      ref={setNodeRef}
      {...listeners}
      extra={
        props.itemKey
          ? [
              <DeleteOutlined
                key={'delete'}
                style={{ fontSize: '20px' }}
                onClick={() => {
                  props.itemDelete(props.itemKey);
                }}
              />,
              <CopyOutlined
                key={'copy'}
                style={{ fontSize: '20px' }}
                onClick={() => {
                  props.itemCopy(props.itemKey);
                }}
              />,
            ]
          : [
              <DeleteOutlined
                key={'delete'}
                style={{ fontSize: '20px' }}
                onClick={() => {
                  props.itemDelete();
                }}
              />,
            ]
      }
      style={style}
      {...attributes}
      hoverable
      bodyStyle={{ display: 'none' }}
      size="small"
      cover={<FGImage url={props.item.image_url} size={'small'} />}
    >
      <Meta description={`${props.item.homo}/${props.item.lumo}`} />
    </Card>
  );
};
