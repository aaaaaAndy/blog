---
title: react源码笔记
date: 2020-07-23 11:03:32
tags: [react, 源码]
categories: react
hidden: true
---

ReactDOM

1. 创建ReactRoot
2. 创建FiberRoot和RootFiber
3. 创建更新



FiberRoot

1. 整个应用的起点
2. 包含应用挂载的目标节点
3. 记录整个应用更新过程中的各种信息



什么是Fiber

1. 每一个ReactElement对应一个Fiber对象
2. 记录节点的各种状态
3. 串联整个应用形成树结构

Class component中的state和props都是保存在fiber上的, 这就为实现hooks提供了基础条件,function组件里没有this,而我们的state, props没有挂载在class的this上,而是fiber上,所以function组件更新的时候也能拿到state, props.

RootFiber对象的child只会存它的第一个子节点, 然后子节点通过sibling指向其兄弟节点.



什么事update

1. 用于记录组件状态的改变
2. 存放于UpdateQueue中



expirationTime种类

1. Sync模式
2. 异步模式
3. 指定context



在React中只有ReactDOM.render, setState, forceUpdate和hooks是合法的更新

setState 和 forceUpdate

1. 给节点的Fiber创建更新



React16重写了react-reconciler, 又叫fiber-reconciler



scheduleWork核心知识点

1. 找到更新对应的FiberRoot节点
2. 如果符合条件重置stack
3. 如果符合条件就请求工作调度

每次的更新都是把RootFiber加入到调度队列里



总体流程概览

react16之前, 一次setState必须把所有的更新流程走完才会执行其他的js代码

react16重写了react的核心源码,加入了fiber的思想,将更新任务切分为不同优先级的小任务,再调度更新



Scheduler的整体流程概览

调度过程中的各种全局变量一览

构建任务调度的概念





scheduleWork

找到更新对应的FiberRoot节点

如果符合条件重置stack

如果符合条件就请求工作调度



requestWork

加入到root调度队列

判断是否批量更新

根据expirationTime判断调度类型



batchedUpdates(批量更新)

this.setState()本身的方法调用时同步的,但是它调用之后并不是马上就能执行更新,这个更新是要根据当前react执行的上下文来判断的,如果处于批量更新的情况下,所有有关的setState都会在最后一起更新掉,对我们的效果就是我们以为是异步的,如果他不处于批量更新的状态,那它就有可能是同步更新, (如果处于异步更新模式的话,它会有一个异步的过程)



reac† scheduler

维护时间片

模拟requestIdleCallback: 等浏览器把其他任务执行完了之后再来执行这个回调, 

调度列表和超时判断



浏览器如果想留长的话要求每秒钟至少渲染30帧以上,即平均每33ms刷新一帧

react-scheduler用来控制react的更新在每33ms内是合理的,不至于超出时间造成卡顿



performWork

1. 是否有deadline的区分
2.  循环渲染root的条件



renderRoot

1. 调用workLoop进行循环单元更新
2. 捕获错误并进行处理
3. 走完流程之后进行善后



currentTime

​	在一次渲染中产生的更新需要使用相同的时间

​	一次批处理的更新应该得到相同的时间

​	挂起任务用于记录的时候应该相同



第五章

入口和优化



reconcileChildren

根据props.children生成fiber子树

判断fiber对象是否可以重复使用

列表根据key优化





数组调和

	1. key的作用
 	2. 对比数组children是否可复用
 	3. generator和Array的区别



forwardRef



mode



conCurrentMode

strictMode



CompleteUnitWork

1. 根据是否中断调用不同的处理方法
2. 根据是否有兄弟节点来执行不同的操作
3. 完成节点之后赋值effect链



重置childExpirationTime



completeWork

1. pop各种context相关的内容
2. 对于HostComponent执行初始化
3. 初始化监听事件



UpdateHostComponent

1. diffProperties计算需要更新的内容
2. 不同的dom property处理方式不同



renderRoot

1. 给报错的节点增加inComplete作用
2. 给父链上具有error boundaty的节点增加副作用
3. 创建错误相关的更新



unWindwork

1. 类似completeWork对不同类型组件进行处理
2. 对于ShouldCapture组件设置DidCapture副作用



Ref

1. 创建Fiber的时候处理ref



legacyContext

1. 会影响整个子树
2. 嵌套的context提供者需要进行合
3. 对性能影响大



stack

1. 更新节点时相关信息入栈
2. 完成节点时相关信息出栈



新context

1. 组件化的使用方式
2. context的提供方和订阅方都是独立的
3. 没有什么附带的性能影响



<!-- more -->

