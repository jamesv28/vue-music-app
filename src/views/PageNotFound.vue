<template>

<section class="not-found">
    <h1>{{title}} </h1>
    <p>{{subtitle}} </p>
</section>
</template>

<script>

export default {
    name: 'PageNotFound',
    data() {
        return {
            title: 'Oops! Something went wrong.',
            subtitle: 'The page you are looking for does not exist'
        }
    }
}
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 64px;
}
h1 {
    font-size: 32px;
}
p {
    font-size: 16px;
}
</style>