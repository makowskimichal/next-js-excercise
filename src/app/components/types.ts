export interface NavigationItem {
  id: string;
  label: string;
  url?: string;
  children?: NavigationItem[];
}
