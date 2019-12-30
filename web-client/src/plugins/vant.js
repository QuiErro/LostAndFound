import Vue from 'vue'

// 1. Loading
import {Loading} from 'vant'
Vue.use(Loading);

// 2. 图片懒加载
import {Image} from 'vant'
Vue.use(Image);

// 3. 提示
import {Toast} from 'vant'
Vue.use(Toast);

// 4. 蒙版提示
import {Dialog} from 'vant'
Vue.use(Dialog);

// 5. 导航栏
import {NavBar} from 'vant'
Vue.use(NavBar);

// 6. 单元格
import {Cell, CellGroup} from 'vant'
Vue.use(Cell).use(CellGroup);

// 7. 弹出层
import { Popup } from 'vant';
Vue.use(Popup);

// 8. 日期组件
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

// 9. 卡片选项
import { Card } from 'vant';
Vue.use(Card);

// 14. 选项卡
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

// 15. 输入框
import { Field } from 'vant';
Vue.use(Field);

// 16. 数字键盘
import { NumberKeyboard } from 'vant';
Vue.use(NumberKeyboard);

// 17. 图标
import { Icon } from 'vant';
Vue.use(Icon);

// 18. 按钮
import { Button } from 'vant';
Vue.use(Button);

// 19. 轮播图
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

// 20. 下拉刷新
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);

// 22. 文件上传
import { Uploader } from 'vant';
Vue.use(Uploader);

// 23. 上拉菜单
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
