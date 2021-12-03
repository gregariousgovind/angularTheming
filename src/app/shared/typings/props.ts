import { KBSCStructure } from './internal';
import {
  IBlockAccessibilityDirective,
  ILayerAccessibilityDirective,
  ITabbableAccessibilityDirective,
} from './structures';

export interface LayerAccessibilityMetadata {
  layerTitle: string;
  layerId?: string;
  version?: 1;
}

export interface BlockAccessibilityMetadata {
  blockTitle: string;
  blockId?: string;
  layerId?: string;
  version?: 1;
  enableArrowNavigation?: boolean;
  leftRightNaviagation?: boolean;
  globalShortcuts?: KBSCStructure[];
}

export interface TabbableAccessibilityMetadata {
  tabbableTitle: string;
  layerId?: string;
  blockId?: string;
  disabled?: boolean;
  tabbableId?: string;
  version?: 1;
  globalShortcuts?: KBSCStructure[];
}

export interface SkipBlockAccessibilityMetadata {
  skipToMain?: boolean;
  version?: 1;
}

export type AccessibilityServiceRegisterBlockProps =
  AccessibilityServiceRegisterBlockPropsV1;
export interface AccessibilityServiceRegisterBlockPropsV1 {
  layerId: string;
  blockId: string;
  blockDirective: IBlockAccessibilityDirective;
  version?: 1;
}

export type AccessibilityServiceDeregisterBlockProps =
  AccessibilityServiceDeregisterBlockPropsV1;
export interface AccessibilityServiceDeregisterBlockPropsV1 {
  layerId: string;
  blockId: string;
  version?: 1;
}

export type AccessibilityServiceRegisterLayerProps =
  AccessibilityServiceRegisterLayerPropsV1;
export interface AccessibilityServiceRegisterLayerPropsV1 {
  layerId: string;
  layerDirective: ILayerAccessibilityDirective;
  version?: 1;
}

export type AccessibilityServiceGetBlockByIdProps =
  AccessibilityServiceGetBlockByIdPropsV1;
export interface AccessibilityServiceGetBlockByIdPropsV1 {
  layerId: string;
  blockId: string;
  version?: 1;
}

export type AccessibilityServiceGetTabbableSequenceProps =
  AccessibilityServiceGetTabbableSequencePropsV1;
export interface AccessibilityServiceGetTabbableSequencePropsV1 {
  layerId: string;
  blockId: string;
  version?: 1;
}

export type AccessibilityServiceRegisterTabbableProps =
  AccessibilityServiceRegisterTabbablePropsV1;
export interface AccessibilityServiceRegisterTabbablePropsV1 {
  layerId: string;
  blockId: string;
  tabbableId: string;
  tabbableDirective: ITabbableAccessibilityDirective;
  version?: 1;
}

export type AccessibilityServiceGetTabbableDirectiveProps =
  AccessibilityServiceGetTabbableDirectivePropsV1;
export interface AccessibilityServiceGetTabbableDirectivePropsV1 {
  layerId: string;
  blockId: string;
  tabbableId: string;
  version?: 1;
}

export type AccessibilityServiceDeregisterTabbableProps =
  AccessibilityServiceDeregisterTabbablePropsV1;
export interface AccessibilityServiceDeregisterTabbablePropsV1 {
  layerId: string;
  blockId: string;
  tabbableId: string;
  version?: 1;
}

export type AccessibilityServiceGetBlockIdForTabbableProps =
  AccessibilityServiceGetBlockIdForTabbablePropsV1;
export interface AccessibilityServiceGetBlockIdForTabbablePropsV1 {
  tabbableElement: HTMLElement;
  version?: 1;
}

export type AccessibilityServiceGetParentLayerIdProps =
  AccessibilityServiceGetParentLayerIdPropsV1;
export interface AccessibilityServiceGetParentLayerIdPropsV1 {
  childElement: HTMLElement;
  version?: 1;
}

export type AccessibilityServiceGetLayerStructureProps =
  AccessibilityServiceGetLayerStructurePropsV1;
export interface AccessibilityServiceGetLayerStructurePropsV1 {
  layerId: string;
  version?: 1;
}

export type AccessibilityServiceDeregisterLayerProps =
  AccessibilityServiceDeregisterLayerPropsV1;
export interface AccessibilityServiceDeregisterLayerPropsV1 {
  layerId: string;
  version?: 1;
}

export type AccessibilityServiceGetBlockSequenceProps =
  AccessibilityServiceGetBlockSequencePropsV1;
export interface AccessibilityServiceGetBlockSequencePropsV1 {
  layerId: string;
  version?: 1;
}
