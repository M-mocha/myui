<template>
    <div class="myui-flexbox-item" v-bind:style="{flex: flex, order: order}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'flexbox-item',
        props: {
            flex: {
                type: Number,
                default: 1
            },
            order: String
        }
    }
</script>

<style lang="less">
@import './style/index';
</style>