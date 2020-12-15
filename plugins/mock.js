import MockAdapter from 'axios-mock-adapter'
import mock from '@/mocks'

export default function({ $axios }) {
  mock(new MockAdapter($axios, { delayResponse: 100 }))
}
