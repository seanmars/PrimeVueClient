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