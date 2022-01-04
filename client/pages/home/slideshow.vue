<template>
  <v-container>
    <v-row>
      <v-col class='py-0'>
        <v-sheet rounded='lg' class='overflow-auto'>
          <SlideShow :album='album' :photos='photos'></SlideShow>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SlideShow from '~/components/Album/Slideshow'

export default {
  name: 'SlideshowPage',
  components: { SlideShow },
  layout: 'default',
  async asyncData({ params, $axios, error }) {
    try {
      const album = await $axios.get(`/api/organisations/${params.org_id}/albums/${params.alb_id}`)
      const photos = await $axios.get(`/api/albums/${params.alb_id}/photos`)
      return { album: album.data, photos: photos.data }
    } catch (e) {
      return error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data() {
    return {
      album: {},
      photos: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
