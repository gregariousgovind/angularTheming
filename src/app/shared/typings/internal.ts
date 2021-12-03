import {
  BlockAccessibilityMetadata,
  LayerAccessibilityMetadata,
} from './props';
import {
  IBlockAccessibilityDirective,
  ILayerAccessibilityDirective,
  ITabbableAccessibilityDirective,
} from './structures';

export interface LayerStructure {
  layerId: string;
  layerTitle: string;
  isPopup?: boolean;
  config: LayerAccessibilityMetadata;
  layerDirective: ILayerAccessibilityDirective;
  blockMap: Map<string, BlockStructure>;
  layerGlobalSC?: Map<string, KBSCStructure>;
  firstFocusableElement?: HTMLElement;
  lastFocusableElement?: HTMLElement;
  blockSquence: string[];
}

export enum Modifier {
  Shift = 'shiftKey',
  Ctrl = 'ctrlKey',
  Alt = 'altKey',
}

export interface KBSCStructure {
  key: string;
  modifierKeys: Modifier[];
  directive?: ITabbableAccessibilityDirective | IBlockAccessibilityDirective;
}

export interface BlockStructure {
  layerId: string;
  blockTitle: string;
  blockId: string;
  config: BlockAccessibilityMetadata;
  blockDirective: IBlockAccessibilityDirective;
  tabbable: Map<string, ITabbableAccessibilityDirective>;
  tabbableSquence: string[];
}

export function generateUUID() {
  return `${Date.now().toString(36) + Math.random().toString(36).substr(2, 5)}`;
}

export enum AccessibilityEventType {
  KeyboardShortcutEvent,
}

export interface AccessibilityEvent {
  type: AccessibilityEventType;
  payload: KeyboardEvent;
}
