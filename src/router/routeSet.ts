export interface ItemLink {
  label: string;
  icon?: string;
  to?: string;
  items?: ItemLink[];
  class?: string;
  disabled?: boolean;
  visible?: boolean;
  separator?: boolean;
  url?: string;
  target?: string;
  command?: (event: { originalEvent: Event; item: ItemLink }) => void;
  component?: string;
}

const routeSet: ItemLink[] = [
  {
    icon: 'fas fa-home',
    label: 'Home',
    to: '/',
    component: 'index',
  },
];

export default routeSet;
