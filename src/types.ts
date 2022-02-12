export interface Attribute {
  id: string;
  name: string;
  weighting: number;
}

export interface Item {
  id: string;
  name: string;
  total: number;
}

export interface AttributeInItemProps {
  id: string;
  name: string;
}
