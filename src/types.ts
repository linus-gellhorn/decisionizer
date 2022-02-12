export interface Attribute {
  id: string;
  name: string;
  weighting: number;
}

export interface AttributeNodeProps extends Attribute {
  handleAttributeSlider: Function;
}

export interface Item {
  id: string;
  name: string;
  total: number;
}

export interface AttributeInItemProps {
  id: string;
  name: string;
  // itemAttributePairs: ItemAttributePair[];
  itemId: string;
  handleAttributeInItemSlider: Function;
}

export interface ItemAttributePair {
  itemId: string;
  attributeId: string;
  value: number;
}
