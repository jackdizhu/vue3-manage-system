import * as zrender from './types/zrender-module'
import './types/zrender-module-types.d.ts'

import {zrenderInit, getGroup, getRectBg, getCircle, getRect, getText, componentUser} from './zrender-utils'

/*
 * 初始化zrender应用
 * Initialize zrender application
 * @param elNode - HTML元素节点
 * @returns zrender实例
 */
export const zrenderAppInit = function (elNode): zrender.ZRenderAppType {
  var container = elNode;

  return zrenderInit(container)
}
