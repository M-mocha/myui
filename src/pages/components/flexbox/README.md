# Flexbox

<!--@ classname -->
flexbox 是 基于CSS flex 布局的一个封装。
<!--@  -->

## 引入方式
```javascript
import Vue from 'vue';
import { Flexbox, FlexboxItem } from 'myui';

// 全局引入
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)

// 局部引入
export default {
  components: {
    Flexbox,
    FlexboxItem
  }
}
```

## 代码演示
```xml
<flexbox gap="sm">
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
</flexbox>
<flexbox gap="sm">
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
</flexbox>
<flexbox gap="sm">
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
    <flexbox-item>
        <div class="placeholder">box</div>
    </flexbox-item>
</flexbox>
```



