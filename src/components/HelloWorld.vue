<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { onMounted, Ref, ref, watch } from 'vue';

// 计时
const start = Date.now();
const count = ref();
onMounted(() => {
  count.value = Date.now() - start;
});

// 创建假数据
const height = 100000;
const arr = (Array as any)
  .apply(null, { length: height })
  .map(Number.call, Number);
const data = arr.map((item: string) => ({ name: item.toString() }));

// 输入框的筛选值
const search = ref('');

// 手动保存的多选框的选中值
const selected: Ref<string[]> = ref([]);

// 渲染的多选框选中值
const checkedList: Ref<string[]> = ref([]);

// 监听多选框变化，将渲染和手动保存的多选框选中值同步。
function onChange(e: any) {
  if (e.target.checked) {
    selected.value.push(e.target.value);
  } else {
    const index = selected.value.findIndex((item) => item === e.target.value);
    selected.value.splice(index, 1);
  }
}

// 监听多选框变化，手动赋值
watch(selected.value, () => {
  checkedList.value = selected.value;
});

// 筛选方法
function submit() {
  alert(`当前筛选值为：${selected.value}`);
}

// 重置方法
function reset() {
  selected.value = [];
  checkedList.value = [];
}
</script>

<template>
  <section>
    本次渲染{{ height }}条数据，共耗时<strong style="color: red">{{
      count
    }}</strong
    >ms
  </section>
  <div class="demo">
    <div style="width: 180px">
      <a-input
        type="text"
        v-model:value="search"
        size="small"
        placeholder="筛选"
      />
    </div>
    <a-checkbox-group v-model:value="checkedList">
      <RecycleScroller
        class="scroller"
        :items="data.filter(({ name }:any) => name.indexOf(search) !== -1)"
        :item-size="32"
        key-field="name"
        v-slot="{ item }"
      >
        <div class="checkbox">
          <a-checkbox :value="item.name" @change="onChange">{{
            item.name
          }}</a-checkbox>
        </div>
      </RecycleScroller>
    </a-checkbox-group>
    <div>
      <a-button @click="submit">筛选</a-button
      ><a-button @click="reset">重置</a-button>
    </div>
  </div>
</template>
<style scoped>
.scroller {
  width: 200px;
  height: 400px;
}

.checkbox {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
