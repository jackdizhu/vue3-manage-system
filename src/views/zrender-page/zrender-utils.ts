import * as zrender from './types/zrender-module'
import './types/zrender-module-types.d.ts'

/*
 * 定义组件数据接口，包含可选的坐标、文本和层级信息
 * Interface for component data with optional coordinates, text and level information
 */
interface ComponentData {
  x?: number;
  y?: number;
  text?: string;
  zlevel?: number;
}

/*
 * 定义图形配置接口，包含宽度、高度、坐标等属性
 * Interface for shape configuration including width, height, coordinates and other properties
 */
interface ShapeConfig {
  width: number;
  height: number;
  x: number;
  y: number;
  zlevel?: number;
  text?: string;
  r?: number;
  cx?: number;
  cy?: number;
}

/*
 * 定义位置接口，包含x和y坐标
 * Interface for position with x and y coordinates
 */
interface Position {
  x: number;
  y: number;
}

/*
 * 扩展zrender.Group类型，添加自定义属性和方法
 * Extend zrender.Group type to add custom properties and methods
 */
type GroupWithComponent = zrender.Group & {
  componentName: string;
  updateWidth: ({width}: {width: number}) => void;
  $updateColor: () => void;
};


/*
 * 创建并返回一个新的zrender组
 * Create and return a new zrender group
 */
export const getGroup = function () {
  return new zrender.Group()
}

/**
 * 图表数据设置方法
 * Method to set chart data
 * @param data - 图表数据
 */
export const setChartData = function (data: any, zRender: any) {
    var width = zRender.getWidth()
    var height = zRender.getHeight()

    if (zRender.$componentGroup) {
        zRender.remove(zRender.$componentGroup)
    }
    var group = getGroup()
    // group.draggable = true
    zRender.$componentGroup = group
    /**
     * 随机位置，创建2000个组件
     */
        for (let i = 0; i < 500; i++) {
        const name = '用户' + i
        const $componentUser = componentUser({
        x: 0,
        y: 0,
        text: name,
        })
        $componentUser.name = name;
        ($componentUser as any).attr('position', [Math.random() * width - 32, Math.random() * height - 96])
        // 添加鼠标拖动，移动组件位置
        $componentUser.draggable = true;
        ($componentUser as any).attr({
          scale: [0.25, 0.25]
        })
        // $componentUser.on('mousemove', (e) => {
        //   if (!this.$zRenderMousedown) {
        //     return false
        //   }
        //   const {offsetX, offsetY} = e
        //   // 获取局部点击位置
        //   const $localPosition = $componentUser.transformCoordToLocal(offsetX, offsetY)

        //   const [x = 0, y = 0] = $componentUser.position
        //   $componentUser.attr({
        //     position: [offsetX - (32 / 2), offsetY - (96 / 2)]
        //   })
        //   console.log('$componentUser', $componentUser, $localPosition)
        // })
        group.add($componentUser)
    }

    zRender.add(group)
}

/*
 * 初始化zrender实例
 * Initialize zrender instance
 */
export const zrenderInit = function (elNode: HTMLElement) {
  var container = elNode;
  console.log('zrenderInit', zrender)
  /*
   * 初始化zrender，设置设备像素比为2以适应高清屏幕
   * Initialize zrender with device pixel ratio of 2 for high-resolution screens
   */
  var zr: zrender.ZRenderAppType = zrender.init(container, {
    devicePixelRatio: 2
  });


  /**
   * 增加自定义属性
   * @param data - 图表数据
   */
  zr.setChartData = function (data: any) {
    setChartData(data, zr)
  }

  return zr
}

/*
 * 创建用户组件，包含矩形、圆形和文本元素
 * Create user component including rectangle, circle and text elements
 */
export const componentUser = function (data: ComponentData = {}): GroupWithComponent {
  /*
   * 1. 创建一个容器组
   * Create a container group
   * 2. 创建一个圆角矩形
   * Create a rounded rectangle
   * 3. 创建一个圆
   * Create a circle
   * 4. 创建一行文字
   * Create a line of text
   */
  /*
   * 设置默认宽高和坐标
   * Set default width, height and coordinates
   */
  const width = 64
  const height = 192
  const x = data.x || 0
  const y = data.y || 0
  const text = data.text || '用户01'
  const zlevel = data.zlevel || 0
  /*
   * 创建一个圆角矩形作为背景
   * Create a rounded rectangle as background
   */
  const rectNode = getRect({width, height: height - 10, x, y: y + 10, zlevel})
  /*
   * 创建一个圆形代表用户头像
   * Create a circle representing user avatar
   */
  const circleNode = getCircle({width, height, x: x + (width / 2), y: y + 16, zlevel})
  /*
   * 创建文本显示用户名称
   * Create text to display username
   */
  const textNode = getText({width, height, text: text, x: x + (width / 2), y: y + (height - 32), zlevel})
  /*
   * 创建一个容器组来包含所有元素
   * Create a container group to contain all elements
   */

  const groupBox = new zrender.Group({
    /*
     * 设置旋转中心点为组件中心
     * Set rotation center point to component center
     */
    // origin: [width / 2, height / 2],
    /*
     * 设置组件起始坐标
     * Set component starting coordinates
     */
    // position: [x, y],
  });
  (groupBox as any).setPosition([x, y]);
  (groupBox as any).setOrigin([width / 2, height / 2]);
  const group: GroupWithComponent = Object.assign(groupBox, {
    componentName: 'componentUser',
    /*
     * 更新组件宽度的方法
     * Method to update component width
     */
    updateWidth: function ({width = 0}) {
      (rectNode as any).attr('shape', {width})
    },
    /*
     * 更新颜色的方法，随机改变文本和圆形颜色
     * Method to update colors by randomly changing text and circle colors
     */
    $updateColor: function () {
      /*
       * 随机改变文字颜色
       * Randomly change text color
       */
      (textNode as any).attr('style', {fill: '#' + Math.floor(Math.random() * 0xffffff).toString(16)});
      /*
       * 点击后随机改变圆形颜色
       * Randomly change circle color after click
       */
      (circleNode as any).attr('style', {fill: '#' + Math.floor(Math.random() * 0xffffff).toString(16)});
    }
  }) as GroupWithComponent;
  
  /*
   * 设置容器宽高
   * Set container width and height
   */
  (group as any).attr('shape', {width, height})
  // group.attr('zlevel', zlevel)
  /*
   * 将各个元素添加到组中
   * Add various elements to the group
   */
  group.add(rectNode)
  group.add(circleNode)
  group.add(textNode)

  /*
   * 绑定点击事件，点击时随机改变圆形颜色
   * Bind click event to randomly change circle color when clicked
   */
  group.on('click', function () {
    /*
     * 点击后随机改变圆形颜色
     * Randomly change circle color after click
     */
    (circleNode as any).attr('style', {fill: '#' + Math.floor(Math.random() * 0xffffff).toString(16)})
  })
  return group
}

/*
 * 创建背景矩形
 * Create background rectangle
 */
export const getRectBg = function ({width, height}: {width: number, height: number}): zrender.Rect {
  const rect = new zrender.Rect({
      shape: {
          x: 0,
          y: 0,
          width: width,
          height: height
      },
      style: {
          fill: '#D7F9FF' // 背景颜色
      },
      zlevel: -1 // 设置层级在最底层
  });
  rect.setPosition([0, 0]);
  return rect;
}

/*
 * 创建圆形元素
 * Create circular element
 */
export const getCircle = function ({width, height, x, y, zlevel = 0}: ShapeConfig): zrender.Circle {
  const circle = new zrender.Circle({
      shape: {
          cx: 0,
          cy: 0,
          r: 16 // 圆形半径
      },
      style: {
          fill: '#FF904F' // 圆形填充颜色
      },
      // position: [x, y], // 圆形位置
      zlevel: zlevel, // 层级
  });
  circle.setPosition([x, y]);
  return circle
}

/*
 * 创建矩形元素
 * Create rectangular element
 */
export const getRect = function ({width, height, x, y, zlevel = 0}: ShapeConfig): zrender.Rect {
  const rect = new zrender.Rect({
      shape: {
          r: 4, // 矩形圆角半径
          x: 0,
          y: 0,
          width: width,
          height: height
      },
      style: {
          fill: '#37B0FF' // 矩形填充颜色
      },
      // position: [x, y], // 矩形位置
      zlevel: zlevel, // 层级
  })
  rect.setPosition([x, y]);
  return rect;
}

/*
 * 创建文本元素
 * Create text element
 */
export const getText = function ({width, height, text = '', x, y, zlevel = 0}: ShapeConfig): zrender.Text {
  const $textNode = new zrender.Text({
      style: {
          text: text, // 文本内容
          textAlign: 'center', // 水平居中对齐
          textBaseline: 'middle', // 垂直居中对齐
          fill: '#fff', // 文本颜色
          fontSize: 20 // 字体大小
      } as any,
      // position: [x, y], // 文本位置
      zlevel: zlevel, // 层级
  });
  ($textNode as any).setStyle('textAlign', 'center');
  /*
   * 计算文字占用宽度以进行居中定位
   * Calculate text width for center positioning
   */
  const textWidth = $textNode.getBoundingRect().width;
  // ($textNode as any).attr('position', [x, y]);
  ($textNode as any).attr('position', [x - textWidth / 2, y]);
  /*
   * 添加自定义方法用于设置文本位置
   * Add custom method for setting text position
   */
  ($textNode as any).$setPosition = function (x: number, y: number) {
    ($textNode as any).attr('position', [x - textWidth / 2, y])
  }
  return $textNode
}
