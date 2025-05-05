<script setup>
import PostItem from './PostItem.vue';
import Author01 from '../images/author-01.jpg'
import Author02 from '../images/author-02.jpg'
import Author03 from '../images/author-03.jpg'

const posts = [
  {
    "id": 0,
    "title": "Adding support for Next.js 14",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Rodrigo Sharma",
    "authorImage": Author01,
    "date": "Aug 27",
    "category": "News"
  },
  {
    "id": 1,
    "title": "Introducing Waitlist's OpenAPI Spec",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Mary Cienfuegos",
    "authorImage": Author02,
    "date": "Aug 24",
    "category": "News"
  },
  {
    "id": 2,
    "title": "Supabase Integration",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Joe Samuel",
    "authorImage": Author03,
    "date": "Aug 24",
    "category": "News"
  },
  {
    "id": 3,
    "title": "Release Version 0.4",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Rodrigo Sharma",
    "authorImage": Author01,
    "date": "Aug 22",
    "category": "News"
  },
  {
    "id": 4,
    "title": "Duplicate prioritization roadmaps",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Joe Samuel",
    "authorImage": Author03,
    "date": "Aug 20",
    "category": "News"
  },
  {
    "id": 5,
    "title": "The Changelog widget",
    "content": "When people upgrade from one version to another, it should be painfully clear when something will break. It should be possible to upgrade to a version that lists deprecations, remove what's deprecated, then upgrade to the version where the deprecations become removals.",
    "author": "Rodrigo Sharma",
    "authorImage": Author01,
    "date": "Aug 20",
    "category": "News"
  }
]
</script>

<template>
  <div class="md:grow -my-5 space-y-4">

    <PostItem v-for="post in posts" :key="post.id" :post="post" />

  </div>
</template>
