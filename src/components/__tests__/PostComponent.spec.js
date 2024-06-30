import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import PostComponent from '../PostComponent.vue'

vi.mock('axios')

describe('PostComponent', () => {
  const postData = [
    { id: 1, username: 'user1', message: 'First post' },
    { id: 2, username: 'user2', message: 'Second post' }
  ]

  beforeEach(() => {
    // Mock axios get method
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: postData })
  })

  it('should create a new post', async () => {
    const newPostData = { id: 3, username: 'user3', message: 'New post' }
    axios.post.mockResolvedValueOnce({ data: newPostData })

    const wrapper = mount(PostComponent)
    await wrapper.setData({ savedUsername: 'user3', message: 'New post' })
    await wrapper.find('.share-button q-btn').trigger('click')

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.posts).toContainEqual(newPostData)
  })

  it('should delete a post', async () => {
    axios.delete.mockResolvedValueOnce()

    const wrapper = mount(PostComponent)
    await wrapper.setData({ posts: postData })

    await wrapper.vm.deletePost(1)
    await flushPromises() // Warten auf alle Promises

    expect(wrapper.vm.posts).not.toContainEqual({ id: 1, username: 'user1', message: 'First post' })
  })
})
