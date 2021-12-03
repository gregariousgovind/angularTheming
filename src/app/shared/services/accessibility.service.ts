import { Injectable, Injector } from '@angular/core';
import {
  AccessibilityEventType,
  BlockStructure,
  KBSCStructure,
  LayerStructure,
} from './../typings/internal';
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
} from './../typings/props';
import {
  AccessibilityMode,
  IAccessibilityService,
  IBlockAccessibilityDirective,
  ITabbableAccessibilityDirective,
} from './../typings/structures';

@Injectable({ providedIn: 'root' })
export class AccessibilityService implements IAccessibilityService {
  private layerMap = new Map<string, LayerStructure>();
  public mode: AccessibilityMode = AccessibilityMode.keyboard;

  constructor(public ngInjector: Injector) {}

  registerLayer({
    layerId,
    layerDirective,
  }: AccessibilityServiceRegisterLayerProps) {
    this.layerMap.set(layerId, {
      layerTitle: layerDirective.config.layerTitle,
      layerId: layerId,
      config: layerDirective.config,
      layerDirective: layerDirective,
      blockMap: new Map<string, BlockStructure>(),
      isPopup: this.isPopupLayer(),
      blockSquence: [],
    });
  }

  getLayerStructure({
    layerId,
  }: AccessibilityServiceGetLayerStructureProps): LayerStructure {
    return this.layerMap.get(layerId);
  }

  deregisterLayer({ layerId }: AccessibilityServiceDeregisterLayerProps) {
    this.layerMap.delete(layerId);
  }

  registerBlock({
    layerId,
    blockId,
    blockDirective,
  }: AccessibilityServiceRegisterBlockProps) {
    if (blockDirective.config.globalShortcuts)
      this.setUpGlobalShortcuts(layerId, blockDirective);
    const blocksInLayer = this.layerMap.get(layerId).blockMap;
    if (blocksInLayer.has(blockId))
      throw Error(
        `The block with Id: ${blockId} already exists, BlockId should be unique`
      );
    blocksInLayer.set(blockId, {
      blockTitle: blockDirective.config.blockTitle,
      layerId: blockDirective.config.layerId,
      blockId: blockDirective.config.blockId,
      config: blockDirective.config,
      blockDirective: blockDirective,
      tabbableSquence: [],
      tabbable: new Map(),
    });
    this.setBlockSequence(layerId);
  }

  private setBlockSequence(layerId: string) {
    const layerStructure = this.layerMap.get(layerId);
    layerStructure.blockSquence = Array.from(
      this.getBlockChildrenForLayer(
        layerStructure.layerDirective.element.nativeElement,
        layerId
      )
    ).reduce((accumulator, node: HTMLElement) => {
      if (
        layerStructure.blockMap.has(
          node.getAttribute('block-acc-tag').substring(10)
        )
      ) {
        accumulator.push(node.getAttribute('block-acc-tag').substring(10));
      }
      return accumulator;
    }, []);
  }

  private removeBlockFromSequence(layerId: string, blockId: string) {
    const layerStructure = this.layerMap.get(layerId);
    layerStructure.blockSquence = layerStructure.blockSquence.filter(
      (el) => el !== blockId
    );
  }

  private getBlockChildrenForLayer(
    layerElement: HTMLElement,
    layerId: string
  ): NodeList {
    return layerElement.querySelectorAll(`[block-acc-layer-id="${layerId}"]`);
  }

  deregisterBlock({
    layerId,
    blockId,
  }: AccessibilityServiceDeregisterBlockProps) {
    const blocksInLayer = this.layerMap.get(layerId).blockMap;
    blocksInLayer.delete(blockId);
    this.removeBlockFromSequence(layerId, blockId);
  }

  getBlockById({
    layerId,
    blockId,
  }: AccessibilityServiceGetBlockByIdProps): IBlockAccessibilityDirective {
    return this.layerMap.get(layerId).blockMap.get(blockId).blockDirective;
  }

  getFocusableTabbableSequence({
    layerId,
    blockId,
  }: AccessibilityServiceGetTabbableSequenceProps): string[] {
    if (!this.layerMap.has(layerId))
      throw Error(`Layer with layerId: ${layerId} does not exist.`);
    if (!this.layerMap.get(layerId).blockMap.has(blockId))
      throw Error(
        `Block with blockId: ${blockId} does not exist in layer with layerId: ${layerId}.`
      );
    const tabbableMap = this.layerMap
      .get(layerId)
      .blockMap.get(blockId).tabbable;
    return this.layerMap
      .get(layerId)
      .blockMap.get(blockId)
      .tabbableSquence.filter(
        (tabbableId) => !tabbableMap.get(tabbableId).config.disabled
      );
  }

  getBlockSequence({ layerId }: AccessibilityServiceGetBlockSequenceProps) {
    if (!this.layerMap.has(layerId))
      throw Error(`Layer with layerId: ${layerId} does not exist.`);
    return this.layerMap.get(layerId).blockSquence;
  }

  registerTabbable({
    layerId,
    blockId,
    tabbableId,
    tabbableDirective,
  }: AccessibilityServiceRegisterTabbableProps) {
    if (tabbableDirective.config.globalShortcuts)
      this.setUpGlobalShortcuts(layerId, tabbableDirective);
    const blocksInLayer = this.layerMap.get(layerId).blockMap;
    const { blockDirective, tabbable } = blocksInLayer.get(blockId);
    if (tabbable.has(tabbableId))
      throw Error(
        `Tabbable element with Id: ${tabbableId} already exists, TabbableId should be unique`
      );
    tabbable.set(tabbableId, tabbableDirective);
    this.setTabbableSquence(layerId, blockId);
    this.setFirstAndLastFocusableChildrenInLayer(layerId);
  }

  isPopupLayer(): boolean {
    return !!this.layerMap.size;
  }

  private setTabbableSquence(layerId: string, blockId: string) {
    const blockStructure = this.layerMap.get(layerId).blockMap.get(blockId);
    blockStructure.tabbableSquence = Array.from(
      this.getTabbableChildrenForBlock(
        blockStructure.blockDirective.element.nativeElement,
        blockId
      )
    ).reduce((accumulator, node: HTMLElement) => {
      if (
        node.getAttribute('tabbable-acc-tag') &&
        blockStructure.tabbable.has(
          node.getAttribute('tabbable-acc-tag').substring(13)
        )
      ) {
        accumulator.push(node.getAttribute('tabbable-acc-tag').substring(13));
      } else if (
        node.getAttribute('tabbable-acc-tag-disabled') &&
        blockStructure.tabbable.has(
          node.getAttribute('tabbable-acc-tag-disabled').substring(13)
        )
      ) {
        accumulator.push(
          node.getAttribute('tabbable-acc-tag-disabled').substring(13)
        );
      }
      return accumulator;
    }, []);
  }

  private getTabbableChildrenForBlock(
    blockElement: HTMLElement,
    blockId: string
  ): NodeList {
    return blockElement.querySelectorAll(
      `[tabbable-acc-block-id="${blockId}"]`
    );
  }

  private removeTabbableFromSequence(
    layerId: string,
    blockId: string,
    tabbableId: string
  ) {
    const blockStructure = this.layerMap.get(layerId).blockMap.get(blockId);
    blockStructure.tabbableSquence = blockStructure.tabbableSquence.filter(
      (el) => el !== tabbableId
    );
  }

  private setUpGlobalShortcuts(
    layerId: string,
    directive: ITabbableAccessibilityDirective | IBlockAccessibilityDirective
  ) {
    const layer = this.layerMap.get(layerId);
    if (!layer.layerGlobalSC) {
      layer.layerGlobalSC = new Map();
      (
        layer.layerDirective.element.nativeElement as HTMLElement
      ).addEventListener(
        'keydown',
        this.globalShortcutsHandler.bind(layer.layerGlobalSC),
        true
      );
    }
    directive.config.globalShortcuts.forEach((sc) => {
      sc.directive = directive;
      layer.layerGlobalSC.set(sc.key.toLowerCase(), sc);
    });
  }

  private removeGlobalShortcuts(
    layerId: string,
    globalShortcuts: KBSCStructure[]
  ) {
    const layer = this.layerMap.get(layerId);
    if (!layer.layerGlobalSC) return;
    globalShortcuts.forEach((sc) => layer.layerGlobalSC.delete(sc.key));
  }

  private setFirstAndLastFocusableChildrenInLayer(layerId: string) {
    const layerStructure = this.layerMap.get(layerId);
    const tabbableElements = (
      layerStructure.layerDirective.element.nativeElement as HTMLElement
    ).querySelectorAll("[tabbable-acc-tag^='tabbable-acc-']");
    if (tabbableElements.length) {
      layerStructure.firstFocusableElement = tabbableElements[0] as HTMLElement;
      layerStructure.lastFocusableElement = tabbableElements[
        tabbableElements.length - 1
      ] as HTMLElement;
    }
  }

  getTabbableDirective({
    layerId,
    blockId,
    tabbableId,
  }: AccessibilityServiceGetTabbableDirectiveProps): ITabbableAccessibilityDirective {
    const blocksInLayer = this.layerMap.get(layerId).blockMap;
    const { tabbable } = blocksInLayer.get(blockId);
    return tabbable.get(tabbableId);
  }

  deregisterTabbable({
    layerId,
    blockId,
    tabbableId,
  }: AccessibilityServiceDeregisterTabbableProps) {
    //TODO always use has before get
    const blocksInLayer = this.layerMap.get(layerId).blockMap;
    const { blockDirective, tabbable } = blocksInLayer.get(blockId);
    if (
      tabbable.get(tabbableId) &&
      tabbable.get(tabbableId).config.globalShortcuts
    )
      this.removeGlobalShortcuts(
        layerId,
        tabbable.get(tabbableId).config.globalShortcuts
      );
    tabbable.delete(tabbableId);
    this.removeTabbableFromSequence(layerId, blockId, tabbableId);
    this.setFirstAndLastFocusableChildrenInLayer(layerId);
  }

  private globalShortcutsHandler = function (e: KeyboardEvent) {
    if (this.has(e.key.toLowerCase())) {
      const kbsc = this.get(e.key.toLowerCase());
      if (
        kbsc.modifierKeys.length ===
        kbsc.modifierKeys.filter((mk) => e[mk]).length
      ) {
        kbsc.directive.eventEmitter.emit({
          payload: e,
          type: AccessibilityEventType.KeyboardShortcutEvent,
        });
        e.preventDefault();
      }
    }
  };

  getBlockIdForTabbable({
    tabbableElement,
  }: AccessibilityServiceGetBlockIdForTabbableProps): string {
    const closestElm = tabbableElement.closest("[block-acc-tag^='block-acc-']");
    if (closestElm) {
      const blockId = closestElm.getAttribute('block-acc-tag').substring(10);
      return blockId;
    }
    return null;
  }

  getParentLayerId({
    childElement,
  }: AccessibilityServiceGetParentLayerIdProps) {
    const startTime = performance.now();
    const layerId = childElement
      .closest("[layer-acc-tag^='layer-acc-']")
      .getAttribute('layer-acc-tag')
      .substring(10);
    const endtime = performance.now();
    return layerId;
  }

  skipToNextBlock(layerId: string, blockId: string) {
    const layerStructure = this.layerMap.get(layerId);
    const nextBlockIndex =
      layerStructure.blockSquence.findIndex((el) => el === blockId) + 1;
    const blockStructure =
      layerStructure.blockSquence[nextBlockIndex] &&
      layerStructure.blockMap.get(layerStructure.blockSquence[nextBlockIndex]);
    if (blockStructure) {
      (
        blockStructure.blockDirective.element.nativeElement as HTMLElement
      ).focus();
    }
  }

  getNextBlockTitle(layerId: string, blockId: string): string {
    const layerStructure = this.layerMap.get(layerId);
    const nextBlockIndex =
      layerStructure.blockSquence.findIndex((el) => el === blockId) + 1;
    const blockStructure =
      layerStructure.blockSquence[nextBlockIndex] &&
      layerStructure.blockMap.get(layerStructure.blockSquence[nextBlockIndex]);
    return blockStructure && blockStructure.blockTitle;
  }
}
