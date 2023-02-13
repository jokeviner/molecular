import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#722ED1',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,

  title: ' ', //'Molecular Pro',
  pwa: false,
  headerHeight: 60,
  logo: '/images/molecular1.png',
  iconfontUrl: '',

  menu: {
    locale: false,
  },
};

export default Settings;
