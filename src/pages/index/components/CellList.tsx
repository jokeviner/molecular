import Cell from './Cell';
import ProCard from '@ant-design/pro-card';
export default (props: { items: M.FG[]; itemOnClick: M.addFG }) => {
  return (
    <ProCard wrap gutter={[8, 8]}>
      {props.items.map((val: M.FG) => (
        <ProCard colSpan="120px" key={val.id} ghost>
          <Cell item={val} onClick={props.itemOnClick} />
        </ProCard>
      ))}
    </ProCard>
  );
};
