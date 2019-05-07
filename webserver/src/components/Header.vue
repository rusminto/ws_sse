<template>
    <div class="applist-header">
        <div class="title">{{title}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: "Home"
        };
    },
    methods: {
    }
};
</script>
<style scoped>
.applist-header {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-flow: column wrap;
    position: fixed;
    height: 70px;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    border-bottom: 1px solid #eaedf3;
    background-color: #ffffff;
}

.title {
    padding: 50px;
    text-align: left;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
}

</style>
