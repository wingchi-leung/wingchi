---
title: "NextJS终极手册"
date: 3,24,2025
---

### 布局和模板
在nextjs中布局是多个路由之间共享的UI，如导航栏，布局会保持状态，保持交互性，不会重新渲染，布局还可以嵌套 

### 路由组
在app目录中，嵌套文件夹通常会映射到URL，但是你可以把文件夹标记为路由组，以防止该文件夹被包含在路由的URL中，，这可以让你将路由段和项目文件组织成逻辑组，而不影响URL路径结构

如何创建路由组：文件夹的名称用圆括号括起来创建路由组（folderName）

#### 动态路由
动态路由的一个好处是你可以用一个page来渲染多种内容，（类似博客文章）
如何创建动态路由： 用方括号[] 命名文件夹，如[slug], [id]

动态段会作为params属性给到layout、page、route、和generteMetadata函数


### SSR、SSG、ISR 
 - SSR （Server-Side Rending） 指服务端将React组件渲染成HTML字符串，并传输到浏览器展示，利用SSR可以加快首屏渲染速度，提高SEO 
 - SSG （Static Site Generation) ，构建时预渲染应用，生成静态的HTML文件，并在请求的时候直接返回文件，使用SSG可以加快页面加载速度，减轻服务器压力
 - ISR （Incremental Static Regeneration）增量静态再生：在构建时部分预渲染，同时在用户请求时动态渲染的技术，它根据一定的规则将预渲染的页面分为小块，并进行缓存。



### use Client
use Client 用于将某个nextjs组件或者页面文件标记成客户端组件
说明：
- 该页面在客户端运行，可以使用客户端的功能，如useState，useEffect
- 不能直接访问服务器端的上下文或者执行服务器端的异步操作


### generateStaticParams 
generateStaticParams是一个服务端函数，用来生成动态路由的静态函数
- 在构建时运行，用于生成动态路由的所有可能的路径。
- 只能在服务端运行，不能在客户端运行
- 通常会和静态生成SSG一起使用， 用于渲染动态路由页面



