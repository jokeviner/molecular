import { Request, Response } from 'express';

// mock tableListDataSource
const genList = (current: number, pageSize: number): M.CellItem[] => {
  const Datas: M.CellItem[] = [];
  const all = [
    'core_152',
    'core_211',
    'core_271',
    'core_330',
    'core_390',
    'core_450',
    'core_508',
    'core_567',
    'core_628',
    'core_658',
    'core_718',
    'core_779',
    'core_840',
    'core_900',
    'core_962',
    'core_1023',
    'core_1085',
    'core_1146',
    'core_1207',
    'core_1269',
    'core_1331',
    'end_17',
    'end_52',
    'end_86',
    'end_135',
    'end_406',
    'end_454',
    'end_501',
    'end_527',
    'end_814',
    'end_869',
    'end_917',
    'end_967',
    'end_1232',
    'end_1284',
    'end_1335',
    'end_1381',
    'end_1672',
    'end_1722',
    'end_1730',
    'end_1748',
    'end_1983',
    'end_1996',
    'end_2014',
    'end_2068',
    'end_2321',
    'end_2357',
    'end_2375',
    'end_2394',
    'end_2649',
    'end_2661',
    'end_2710',
    'end_2760',
    'end_3026',
    'end_3040',
    'end_3052',
    'end_3099',
    'end_3385',
    'end_3435',
    'end_3484',
    'end_3537',
    'end_3819',
    'end_3860',
    'end_3901',
    'end_3947',
    'end_4203',
    'end_4251',
    'end_4301',
    'end_4351',
    'end_4639',
    'end_4687',
    'end_4733',
    'end_4775',
    'end_5032',
    'end_5078',
    'end_5124',
    'end_5169',
    'end_5442',
    'end_5497',
    'end_5545',
    'end_5590',
    'end_5857',
    'end_5899',
    'end_5947',
    'end_5991',
    'end_6266',
    'end_6306',
    'end_6346',
    'end_6387',
    'end_6654',
    'side_26',
    'side_39',
    'core_33',
    'core_93',
  ];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    if (all[i]) {
      const [type, id] = all[i].split('_');
      Datas.push({
        id: +id,
        image_url: `/images/${type}_${id}.png`,
        name: type,
        lumo: -1.5,
        homo: -20,
        position: type,
      });
    } else {
      return Datas;
    }
  }
  return Datas;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  const pageSize = 100;
  const result = {
    data: tableListDataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    page: 1,
    current: 1,
  };

  return res.json(result);
}

export default {
  'GET /api/cell': getRule,
};
