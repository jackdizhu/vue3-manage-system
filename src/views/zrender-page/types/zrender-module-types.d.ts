import * as zrender from 'zrender';
import 'zrender/index.d.ts';

// 使用模块增强而不是全局命名空间声明来扩展zrender类型
declare module 'zrender' {
  interface Group {
    componentName?: string;
    updateWidth?: ({width}: {width: number}) => void;
    $updateColor?: () => void;
  }
  
  // 扩展ZRenderType接口，添加自定义方法和属性
  interface ZRenderType {
    setChartData?: (data: any) => void;
    $componentGroup?: zrender.Group;
  }

  interface ZRenderAppType extends ZRenderType {
    setChartData?: (data: any) => void;
  }
}

// 重新导出原有内容
export * from 'zrender';
