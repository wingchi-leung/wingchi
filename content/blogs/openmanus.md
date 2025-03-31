---
title: "OpenManus技术浅析"
date: 3,24,2025
 
---
 最近在参加OpenManus的黑客松，就来研究一下它的源码。目前还处于Demo阶段，代码量不多，优化空间很大。非常适合刚入门想要研究智能体开发的新手

> 本文只记录当前个人调试和阅读OpenManus代码的理解，可能会出现纰漏或理解错误！！  
### 整体架构

核心目录，功能已经很清晰了。 
![[Pasted image 20250329204030.png]]


目前应该是只用了下图几个Agent，其他的如SWE Agent貌似还没有用上。围绕着 Manus Agent做了任务的拆分和编排。  继承图如下： 

![[openmanus art.png]]

在解释几个Agent之前，先了解一篇关键2022年发布的论文： **ReAct：Synergizing Reasoing and Actiong In Language Models 在大语言模型中协同推理和行动。** 其中提出了一种引导LLMs完成任务的新思路。  

ReAct核心思想是要求大模型不断重复地去推理、行动、观察 ，来完成多步复杂的任务。这种方式比起单纯的推理或行动能够更好地提升模型的表现。

 我们用论文中的一个示例来理解这个范式， 分别用4种提示方法来让大模型解决一个问题：  寻找遥控器之外控制苹果TV的工具。
 
(a) 标准，(b) 思考链（CoT，仅推理），(c) 仅行动，和(d)  ReAct（推理+行动）

 ![[Pasted image ReAct.png]]

可以看到只有ReAct回答正确，LLM在每次行动后，还会观察行动的结果并推理下一步的行动。


OpenManus正是基于ReAct的算法构建的。 
- Base：初始化Agent，包括内存管理、Agent状态管理、模型配置、并定义了一个基础的框架给子类继承。
- ReAct：对**ReAct**的核心实现，包括三个核心方法：think()，act()， step() 
- ToolCall：调用工具的Agent， 也实现了think()和act(), 方法，是目前OpenManus默认模式下，能够调用工具行动的Agent。
- Browser：专门和浏览器交互的Agent
- Manus：比较简单，只实现了think() 方法。


### 运行流程

跑起来调试几次可以看清楚函数的调用过程
![[Pasted image 20250329173749.png]]

1.  执行起点 base.run() 控制整体流程
2. ReAct循环，ReAct.step()是核心的ReAct算法思考-行动循环步骤
3. 思考链（Think Chain）：Manus.think()、Browser.think()、ToolCall.think() 调用链，每个think方法都调用了父方法的think方法，最后是ToolCall这个Agent和LLM交互。
4. 在ToolCall中，负责整合上下文和Prompt，调用LLM，解析LLM返回的信息， 如果有工具调用（ToolCall），则组装参数调用对应的工具 ，把工具调用返回的信息传递LLM 作为Observation


### 踩坑经验

### Qwen/ToolCall参数格式不是JSON 

用硅基流动的Qwen/QwQ-32B跑Case时，经常遇到执行Tool的时候报错：
``` python
tool_context=None llm=<app.llm.LLM object at 0x0000017E331416A0> argument after ** must be a mapping, not str
```
原因就是这个模型返回来的toolcall的参数，不是json格式的。 调试分析确实经常返回了字符串而不是JSON格式

![[Pasted image 20250330200230.png]]

修复：实际上模型返回的JSON多了一层""所以变成字符串了，从可用性的角度来说修复也很简单，多加一次loads就能够提高使用上的准确度 。 

在toolcall.py#execute_tool 方法中添加args为json的校验，如果不是JSON，再尝试json.loads()
``` python 
try:  
    # Parse arguments  
    args = json.loads(command.function.arguments or "{}")  
    logger.info(f"Checkin args is JSON: type={type(args)} , args={args}")  
  
    # Execute the tool  
    logger.info(f"🔧 Activating tool: '{name}'...")  
  
    if not type(args)==dict :  
        try :  
            args = json.loads(args)  
        except Exception as e:  
            result = "Error: invalid tool arguments!! suppose to be JSONObject but found str,please"  
  
    result = await self.available_tools.execute(name=name, tool_input=args)
```



### OpenManus不结束任务

不计异常，openmanus可能会有两种情况结束：
- 规划到最大步数了（默认最大20步）
- 智能体判断任务完成，自己决定调用terminate结束。

但是你会发现OpenManus经常把结果已经输出出来了，也不调用工具， 还是不断进行下一步。实际上是OpenManus认为结果已经完成了，但是提示词和工具上没有很好地引导模型自主终止。 


优化方向之一是提示词增强，比如在Manus的提示词中修改强调识别任务是否完成，如果已经完成了可以使用终止工具结束任务。

``` python
SYSTEM_PROMPT = (  
    "You are OpenManus, an all-capable AI assistant, aimed at solving any task presented by the user."  
    "You have various tools at your disposal that you can call upon to efficiently complete complex requests."    "Whether it's programming, information retrieval, file processing, or web browsing, you can handle it all."    "<important> you should always choose a tool, when tool executed fail,you can try it again or select other tool."    "<important> If you stop, use `terminate` tool/function call.<important> "    "for user experience, You should deliver you final work file in the end of of task,whether it's markdown,txt,chart,or any code. you can decide, but if it's text output,it's best to write a markdown file."    "The initial directory is: {directory}")  
  
NEXT_STEP_PROMPT = """  
Based on user needs, proactively select the most suitable tool or combination of tools. For complex tasks,  
you can break down the problem and use different tools step by step to solve it. After using each tool, compactly explain the execution results and suggest the next steps.  
<important> Once you notice your job is done,you should call `terminate` tool to end your mission.<important> `  
"""
```




