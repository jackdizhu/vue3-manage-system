<template>
    <div class="container">
        <div class="plugins-tips">
            zrender 访问地址：
            <a href="https://ecomfe.github.io/zrender-doc/public/" target="_blank">zrender</a>
        </div>
        <el-card class="mgb20" shadow="hover">
            <template #header>
                <div class="content-title">自定义图表</div>
            </template>
            <div class="chart-zrender">
                <!-- 新增按钮，模拟接口调用，更新图表数据 -->
                 <el-button type="primary" @click="updateChartData">更新图表</el-button>
                <!-- 在这里添加你的自定义zrender图表代码 -->
                <div ref="zrenderAppRef"
                    class="zrender-app"
                    style="width: 800px; height: 600px;">
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="zrender-chart">
import * as zrender from './types/zrender-module'
import './types/zrender-module-types.d.ts'

import { ref, onMounted, onBeforeMount, onBeforeUnmount, onUnmounted, onUpdated, onBeforeUpdate } from 'vue'

/**
 * zrender-chart 组件
 * 引入zrender-app模块，并初始化 zrender 图表
 */
import {zrenderAppInit} from './zrender-app'

// 定义响应式引用
const zrenderAppRef = ref<HTMLElement | null>(null)
let zrInstance: zrender.ZRenderAppType | null = null

// 更新图表数据的示例方法
const updateChartData = (data: any) => {
	if (zrInstance) {
        zrInstance.setChartData && zrInstance.setChartData(data)
        console.log('zrender-chart: 图表数据已更新', data)
	}
}

/*
 * onMounted: 在组件挂载完成后调用
 * Called after the component is mounted
 */
onMounted(() => {
    console.log('zrender-chart: 组件已挂载')
    if (zrenderAppRef.value) {
        zrInstance = zrenderAppInit(zrenderAppRef.value)
        console.log('zrender-chart: zrender 初始化完成', zrInstance)
    }
})

// 组件卸载前清理 zrender 实例
onBeforeUnmount(() => {
    console.log('zrender-chart: 组件即将卸载')
    if (zrInstance) {
        zrInstance.dispose()
        zrInstance = null
        console.log('zrender-chart: zrender 实例已销毁', zrInstance)
    }
})

</script>

<style scoped>
.schart {
    width: 100%;
    height: 400px;
}

.content-title {
    font-weight: 400;
    font-size: 22px;
    color: #1f2f3d;
}
</style>