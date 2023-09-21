import { api } from './api'

type createProduct = {
  name: string
  category: string
  price: number
}

export const createProduct = async ({
  name,
  category,
  price,
}: createProduct) => {
  const body = { name, category, price }
  return api.post('products', body).then((res) => res)
}

export const getProducts = async () => {
  return api.get('products').then((res) => res)
}

export const deleteProduct = async (id: number) => {
  return api.delete(`products/${id}`).then((res) => res)
}

export const updateProduct = async (id: string, body: createProduct) => {
  return api.put(`products/${id}`, body).then((res) => res)
}
