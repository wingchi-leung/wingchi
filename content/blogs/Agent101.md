---
title: "Agent101：从概念到代码理解Agent"
date: "2025-03-28"
 
---

## Agent101 
Agent是最近大火的概念，随着Manus的火爆也带火了一把Agent，因为这个概念还很新，实际上后端工程和LLM的交互也属于比较浅的阶段，还有不少可以挖掘和研究的方向。
### Agent 是什么
> Anthropic的Claude模型在处理真实世界的任务上吊打其他模型，他们团队也发布了一些高质量的博客和代码，非常值得学习，本文也是基于Anthropic关于Agent的博客进行展开。 

Anthropic对Agent的定义时，将AI Workflows和Agents区分开来：

Workflow是通过预定好的代码和路径编排LLM和工具的系统。

而Agent是一个LLM能够动态决定它自己流程和工具的系统，在这个系统将由LLM自行决定控制如何完成任务。比如调用什么工具，调用工具后获取反馈，并且思考下一步该怎么做。

Agent的兴起少不了LLM在一些关键能力的快速进化，例如理解复杂输入，完成推理和规划，使用外部工具和能够从错误中恢复的能力。 


你可以理解智能体是工程师为大语言模型构建了一个外围系统，提供了工具集合，如网络搜索、读写系统文件等等，并且给大模型提供了一个思考和行动框架。 

对比workflow和Agent，你就能从最简单的层面理解为啥Manus团队在闭门会中说到Less Structrue，More Intelligent，WorkFlow中的LLM的位置是死的，是很简单的线性输入输出，但是Agent中的LLM是需要自己决定下一步做什么并且用什么工具去做的。 灵活度的系统让LLM可以发挥自己，可能会产生令你震惊的智能。


### 如何构建Agent 

Anthropic 的[代码仓库](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents)里面有一个Antrhopic基于自家API构建工作流的CookBook。









