import { describe, it, expect, vi } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import PostComponent from '../PostComponent.vue'

vi.mock('axios')

describe('PostComponent', () => {
  vi.mock('axios')

  const postsFromBackend = [
    { id: 1, username: 'user1', message: 'First post' },
    { id: 2, username: 'user2', message: 'Second post' }
  ]

  it('should display info if list from backend is empty', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: [] })
    const wrapper = shallowMount(PostComponent, { props: { title: 'test' } })
    await flushPromises()
    expect(wrapper.text()).toContain('No heroes yet!')
  })

  it('should render posts from backend', async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: postsFromBackend })
    const wrapper = shallowMount(PostComponent)
    await flushPromises()
    expect(wrapper.findAll('.post-item').length).toBe(postsFromBackend.length)
    expect(wrapper.text()).toContain('First post')
    expect(wrapper.text()).toContain('Second post')
  })

  it('should create a new post', async () => {
    const newPostData = { id: 3, username: 'user3', message: 'New post' }
    vi.mocked(axios, true).post.mockResolvedValueOnce({ data: newPostData })

    const wrapper = shallowMount(PostComponent)
    wrapper.setData({
      newPost: { username: 'user3', message: 'New post' }
    })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.vm.posts).toContainEqual(newPostData)
    expect(wrapper.findAll('.post-item').length).toBe(1) // Assuming it adds one post
    expect(wrapper.text()).toContain('New post')
  })

  it('should delete a post', async () => {
    const postData = [
      { id: 3, username: 'user3', message: 'New post' },
      { id: 2, username: 'user2', message: 'Second post' }
    ]
    const deletedPostId = 3

    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: postData })
    vi.mocked(axios, true).delete.mockResolvedValueOnce()

    const wrapper = shallowMount(PostComponent)
    await flushPromises()

    // Wait for Vue to render after initial data load
    await wrapper.vm.$nextTick()

    // Trigger delete
    await wrapper.find('.post-item button.delete').trigger('click')

    // Wait for deletion and re-render
    await flushPromises()

    expect(wrapper.vm.posts).not.toContainEqual(postData.find((post) => post.id === deletedPostId))
    expect(wrapper.findAll('.post-item').length).toBe(postData.length - 1)
  })

  it('should update a post', async () => {
    const postData = [
      { id: 3, username: 'user3', message: 'New post' },
      { id: 2, username: 'user2', message: 'Second post' }
    ]
    const updatedPostData = { id: 3, username: 'user3', message: 'Updated post' }

    vi.mocked(axios, true).get.mockResolvedValueOnce({ data: postData })
    vi.mocked(axios, true).put.mockResolvedValueOnce({ data: updatedPostData })

    const wrapper = shallowMount(PostComponent)
    await flushPromises()

    // Trigger update (assuming this clicks an edit button)
    await wrapper.find('.post-item button.edit').trigger('click')

    // Simulate update form submission
    wrapper.setData({
      editedPost: updatedPostData
    })
    await wrapper.find('.edit-form').trigger('submit.prevent')

    // Wait for update and re-render
    await flushPromises()

    expect(wrapper.vm.posts).toContainEqual(updatedPostData)
    expect(wrapper.findAll('.post-item').length).toBe(postData.length)
    expect(wrapper.text()).toContain('Updated post')
  })
})
