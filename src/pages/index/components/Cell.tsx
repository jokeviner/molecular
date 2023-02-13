import Meta from 'antd/lib/card/Meta';
import CellImage from './CellImage';
import { Card } from 'antd';
import { purple } from '@ant-design/colors';

export default (props: { item: M.FG; onClick: M.addFG }) => {
  return (
    <Card
      size="small"
      hoverable
      cover={<CellImage url={props.item.image_url} />}
      actions={[]}
      bodyStyle={{ backgroundColor: purple[0] }}
      onClick={() => {
        props.onClick(props.item);
      }}
    >
      <Meta
        description={
          <>
          {props.item.position=='side' && <div>{props.item.side}</div>}
          {props.item.position=='end' && <><div style={{whiteSpace:'nowrap'}}>{props.item.name}</div><div>LUMO:{props.item.lumo}</div></>}
          {props.item.position=='core' && <><div>LUMO:{props.item.lumo}</div><div>HOMO:{props.item.homo}</div></>}
          </>
        }
      />
    </Card>
  );
};
