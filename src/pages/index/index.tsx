import ProCard from '@ant-design/pro-card';
import { GridContent } from '@ant-design/pro-layout';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { BackTop, Button, Row, Statistic } from 'antd';
import SelectLIst from './components/SelectLIst';
import FG from './components/FG';
import FGList from './components/FGList';
import styles from './components/FG.less';
import { useState } from 'react';
import request from 'umi-request';

export default () => {
  const { Divider } = ProCard;
  const [molecular, setMolecular] = useState<M.Molecular>({ core: [] });
  const [coreSortKeys, setCoreSortKeys] = useState<string[]>([]);
  const [position, setPosition] = useState('start');
  const [res, setRes] = useState<any>({ lumo: 0, humo: 0, data: '' });
  // const [items, setItems] = useState();
  // function dragEndEvent(props: any) {
  //   const { active, over } = props;
  //   const activeIndex = items.indexOf(active.id);
  //   if (over) {
  //     const overIndex = items.indexOf(over.id);
  //     setItems((items) => {
  //       console.log(items, activeIndex, overIndex);
  //       return arrayMove(items, activeIndex, overIndex);
  //     });
  //   }
  // }

  function generateKey(id: string | number = '0') {
    const key = id + '_' + Math.random().toString(36).substr(2, 9);
    return key;
  }
  function addFG(fg: M.FG) {
    if (position == 'core') {
      if (molecular.core.length >= 15) {
        return;
      }
      setMolecular((m) => ({ ...m, core: [...m.core, fg] }));
      setCoreSortKeys((k) => [...k, generateKey(fg.id)]);
    } else {
      setMolecular((m) => ({ ...m, [position]: fg }));
    }
  }
  function deleteFG(key?: string) {
    if (key) {
      const index = coreSortKeys.indexOf(key);
      console.log(index);
      setMolecular({ ...molecular, core: molecular.core.filter((_, i) => i !== index) });
      setCoreSortKeys([...coreSortKeys.filter((_, i) => i !== index)]);
    } else {
      setMolecular({ ...molecular, [position]: undefined });
    }
  }
  function copyFG(key: string) {
    console.log('copy');
    if (molecular.core.length >= 23) {
      return;
    }
    const index = coreSortKeys.indexOf(key);
    const item = molecular.core[index];
    const m = { ...molecular };
    m.core.splice(index, 0, item);
    setMolecular(m);
    const k = [...coreSortKeys];
    const newKey = generateKey(item.id);
    k.splice(index, 0, newKey);
    setCoreSortKeys(k);
  }
  function dragEndEvent(props: any) {
    const { active, over } = props;
    if (active && over) {
      const activeIndex = coreSortKeys.indexOf(active.id);
      const overIndex = coreSortKeys.indexOf(over.id);
      const m = { ...molecular };
      const tmp = m.core[activeIndex];
      m.core[activeIndex] = m.core[overIndex];
      m.core[overIndex] = tmp;
      setMolecular(m);

      const k = [...coreSortKeys];
      const t = k[activeIndex];
      k[activeIndex] = k[overIndex];
      k[overIndex] = t;
      setCoreSortKeys(k);
    }
  }
  function change(newPosition: string) {
    setPosition(newPosition);
  }
  function formatMolecular(molecular: M.Molecular) {
    //const m:[number|undefined,number[]|undefined,number|undefined,number|undefined] = [,,,,];
    const m: any = [];
    m[0] = molecular.start ? [molecular.start.id, molecular.start.lumo] : [0, 0];
    m[2] = molecular.end ? [molecular.end.id, molecular.end.lumo] : [0, 0];
    m[3] = molecular.side ? [molecular.side.id, molecular.side.side] : [0, 0];
    m[1] = molecular.core.map((item) => [item.id, item.lumo, item.homo]);
    return m;
  }
  function inference() {
    const m = formatMolecular(molecular);
    request
      .post(API_URL + '/holu/', {
        data: {
          molecular: m,
        },
      })
      .then(function (response) {
        setRes({
          lumo: response.result[0],
          humo: response.result[1],
          data: response.input,
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <ProCard ghost wrap gutter={[0, 24]}>
      <ProCard colSpan={24}>
        <ProCard
          colSpan="96px"
          ghost
          className={styles.tab + (position == 'start' ? ' ' + styles.tabCurrent : '')}
          onClick={() => {
            change('start');
          }}
        >
          <div className={styles.title}>End-group</div>
          {molecular.start && <FG item={molecular.start} itemDelete={deleteFG} />}
        </ProCard>
        <Divider type="vertical" />
        <ProCard
          ghost
          className={styles.tab + (position == 'core' ? ' ' + styles.tabCurrent : '')}
          onClick={() => {
            change('core');
          }}
        >
          <div className={styles.title}>Core</div>

          <FGList
            items={molecular.core}
            keys={coreSortKeys}
            itemCopy={copyFG}
            itemDelete={deleteFG}
            dragEndEvent={dragEndEvent}
          />
        </ProCard>
        <Divider type="vertical" />
        <ProCard
          colSpan="96px"
          ghost
          className={styles.tab + (position == 'end' ? ' ' + styles.tabCurrent : '')}
          onClick={() => {
            change('end');
          }}
        >
          <div className={styles.title}>End-group</div>

          {molecular.end && <FG item={molecular.end} itemDelete={deleteFG} />}
        </ProCard>
        <Divider type="vertical" />
        <ProCard
          colSpan="96px"
          ghost
          className={styles.tab + (position == 'side' ? ' ' + styles.tabCurrent : '')}
          onClick={() => {
            change('side');
          }}
        >
          <div className={styles.title}>Side-chains</div>

          {molecular.side && <FG item={molecular.side} itemDelete={deleteFG} />}
        </ProCard>
      </ProCard>
      <ProCard colSpan={24} gutter={[24, 0]}>
        <ProCard colSpan={4} ghost layout="center" direction="column">
          <Button type="primary" size="large" block onClick={inference}>
            Calculate{' '}
          </Button>
        </ProCard>
        <ProCard colSpan={4} ghost layout="center" direction="column">
          <Statistic title="LUMO" value={res.lumo} />
        </ProCard>
        <ProCard colSpan={4} ghost>
          <Statistic title="HOMO" value={res.humo} />
        </ProCard>
        <ProCard colSpan={12} ghost>
          DATA:
          <br />
          <div style={{ overflowWrap: 'anywhere' }}>{res.data}</div>
        </ProCard>
      </ProCard>
      <ProCard colSpan={24} ghost>
        <SelectLIst itemOnClick={addFG} position={position != 'start' ? position : 'end'} />
      </ProCard>
      <BackTop />
    </ProCard>
  );
};
