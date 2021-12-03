import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { LayerStructure } from './internal';
import {
  AccessibilityServiceDeregisterBlockProps,
  AccessibilityServiceDeregisterLayerProps,
  AccessibilityServiceDeregisterTabbableProps,
  AccessibilityServiceGetBlockByIdProps,
  AccessibilityServiceGetBlockIdForTabbableProps,
  AccessibilityServiceGetBlockSequenceProps,
  AccessibilityServiceGetLayerStructureProps,
  AccessibilityServiceGetParentLayerIdProps,
  AccessibilityServiceGetTabbableDirectiveProps,
  AccessibilityServiceGetTabbableSequenceProps,
  AccessibilityServiceRegisterBlockProps,
  AccessibilityServiceRegisterLayerProps,
  AccessibilityServiceRegisterTabbableProps,
  BlockAccessibilityMetadata,
  LayerAccessibilityMetadata,
  TabbableAccessibilityMetadata,
} from './props';

export interface ILayerAccessibilityDirective {
  element: ElementRef;
  config: LayerAccessibilityMetadata;
  renderer: Renderer2;
  eventEmitter: EventEmitter<any>;
}

export interface IBlockAccessibilityDirective {
  element: ElementRef;
  config: BlockAccessibilityMetadata;
  renderer: Renderer2;
  eventEmitter: EventEmitter<any>;
}

export interface ITabbableAccessibilityDirective {
  element: ElementRef;
  config: TabbableAccessibilityMetadata;
  renderer: Renderer2;
  eventEmitter: EventEmitter<any>;
}

//=====================================

export enum AccessibilityMode {
  keyboard = 'KEYBOARD',
}

export interface IAccessibilityService {
  mode: AccessibilityMode;
  registerLayer(props: AccessibilityServiceRegisterLayerProps): void;
  getLayerStructure(
    props: AccessibilityServiceGetLayerStructureProps
  ): LayerStructure;
  deregisterLayer(props: AccessibilityServiceDeregisterLayerProps): void;
  registerBlock(props: AccessibilityServiceRegisterBlockProps);
  deregisterBlock(props: AccessibilityServiceDeregisterBlockProps): void;
  getBlockById(
    props: AccessibilityServiceGetBlockByIdProps
  ): IBlockAccessibilityDirective;
  getFocusableTabbableSequence(
    props: AccessibilityServiceGetTabbableSequenceProps
  ): string[];
  getBlockSequence(props: AccessibilityServiceGetBlockSequenceProps): void;
  registerTabbable(props: AccessibilityServiceRegisterTabbableProps): void;
  isPopupLayer(): boolean;
  getTabbableDirective(
    props: AccessibilityServiceGetTabbableDirectiveProps
  ): ITabbableAccessibilityDirective;
  deregisterTabbable(props: AccessibilityServiceDeregisterTabbableProps): void;
  getBlockIdForTabbable(
    props: AccessibilityServiceGetBlockIdForTabbableProps
  ): string;
  getParentLayerId(props: AccessibilityServiceGetParentLayerIdProps): string;
}
