export interface NavLink {
  id: number;
  name: string;
  type: string;
}

export interface NavIcon {
  id: number;
  img: string;
}

export interface DockApp {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
}

export interface BlogPost {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
}

export interface TechStack {
  category: string;
  items: string[];
}

export interface Social {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
}

export interface PhotosLink {
  id: number;
  icon: string;
  title: string;
}

export interface GalleryItem {
  id: number;
  img: string;
}

export interface LocationChildDescription {
  id: number;
  name: string;
  icon: string;
  kind: string;
  fileType?: string;
  position?: string;
  description?: string[];
  href?: string;
  imageUrl?: string;
  subtitle?: string;
  image?: string;
}

export interface LocationChild extends LocationChildDescription {
  children?: LocationChild[];
}

export interface Location {
  id: number;
  type: string;
  name: string;
  icon: string;
  kind: string;
  children: LocationChild[];
}

export interface Locations {
  work: Location;
  about: Location;
  resume: Location;
  trash: Location;
}

export interface WindowConfigItem {
  isOpen: boolean;
  zIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export interface WindowConfig {
  finder: WindowConfigItem;
  contact: WindowConfigItem;
  resume: WindowConfigItem;
  safari: WindowConfigItem;
  photos: WindowConfigItem;
  terminal: WindowConfigItem;
  txtfile: WindowConfigItem;
  imgfile: WindowConfigItem;
}
