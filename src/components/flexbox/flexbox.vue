<template>
    <div class="myui-flexbox" v-bind:class="classnames">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'flexbox',
        props: {
            gap: String,
            direction: String,
            wrap: String,
            justify: String,
            align: String,
            alignContent: String
        },
        computed: {
            classnames() {
                return {
                    [`myui-flexbox-dir-${this.direction}`]: !!this.direction,
                    [`myui-flexbox-${this.wrap}`]: !!this.wrap,
                    [`myui-flexbox-justify-${this.justify}`]: !!this.justify,
                    [`myui-flexbox-align-${this.align}`]: !!this.align,
                    [`myui-flexbox-align-content-${this.alignContent}`]: !!this.alignContent,
                    [`myui-flexbox-gap-${this.gap}`]: !!this.gap
                }
            }
        }
    }
</script>
<style lang="less">
@import './style/index';
</style>