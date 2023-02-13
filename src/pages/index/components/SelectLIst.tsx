import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { request } from 'umi';
import CellList from './CellList';
import { Input } from 'antd';

export default (props: { itemOnClick: M.addFG; position: M.Position }) => {
  const columns: ProColumns<M.FG>[] = [
    {
      title: '',
      dataIndex: 'search',
      valueType: 'text',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Input.Search
            enterButton="Search"
            size="large"
            onSearch={() => {
              form.submit();
            }}
          />
        );
      },
    },
  ];
  console.log('reload table');
  return (
    <ProTable<M.FG>
      params={{ position: props.position }}
      columns={columns}
      request={async (params = {}, sort, filter) => {
        const data = await request(API_URL + '/functional-group/', { params, useCache: true });
        const filterData = data.data.filter((item: M.FG) => item.position == props.position);
        data.data = filterData;
        return data;
      }}
      rowKey="id"
      pagination={{
        showSizeChanger: true,
      }}
      tableExtraRender={(_, data) => {
        return <CellList items={data} itemOnClick={props.itemOnClick} />;
      }}
      options={false}
      search={false}
      // options={{
      //   search: true,
      // }}
      // search={{
      //   optionRender: false,
      //   collapsed: false,
      //   span: 24,
      //   searchGutter: {},
      // }}
      tableRender={() => {
        <></>;
      }}
    />
  );
};
